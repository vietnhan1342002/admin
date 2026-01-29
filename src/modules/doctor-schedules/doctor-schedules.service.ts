import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorSlotRepository } from './repositories/doctor-slot.repository';
import { DoctorScheduleMapper } from './mappers/doctor-schedules.mapper';
import { DoctorWorkingDateRepository } from './repositories/doctor-working-date.repository';
import { DoctorShiftRepository } from './repositories/doctor-shift.repository';
import { DataSource } from 'typeorm';
import { WorkdayDoctorsDto } from './dto/workday-doctor.dto';
import { DoctorWorkingDate } from './entities/doctor-working-date.entity';
import { DoctorShift } from './entities/doctor-shift.entity';
import { DoctorShiftStatus } from './enum/doctor-shift.enum';
import { DoctorSlot } from './entities/doctor-slot.entity';
import { DoctorSlotStatus } from './enum/doctor-slot.enum';
import dayjs from 'dayjs';

@Injectable()
export class DoctorSchedulesService {
  constructor(
    private readonly workingDateRepo: DoctorWorkingDateRepository,
    private readonly shiftRepo: DoctorShiftRepository,
    private readonly slotRepo: DoctorSlotRepository,
    private readonly mapper: DoctorScheduleMapper,
    private readonly datasource: DataSource,
  ) {}

  //   async createDoctorSchedule(payload: WorkdayDoctorsDto[]): Promise<void> {
  //     await this.datasource.transaction(async (manager) => {
  //       for (const workday of payload) {
  //         const { date, doctors } = workday;

  //         for (const doctorItem of doctors) {
  //           const { doctorId, shift, selectedSlots } = doctorItem;

  //           /**
  //            * 1️⃣ Create or get DoctorWorkingDate
  //            */
  //           let workingDate = await manager.findOne(DoctorWorkingDate, {
  //             where: {
  //               doctor: { id: doctorId },
  //               date,
  //             },
  //             relations: ['doctor'],
  //           });

  //           if (!workingDate) {
  //             workingDate = manager.create(DoctorWorkingDate, {
  //               doctor: { id: doctorId },
  //               date,
  //             });

  //             await manager.save(workingDate);
  //           }

  //           /**
  //            * 2️⃣ Create DoctorShift
  //            */
  //           const doctorShift = manager.create(DoctorShift, {
  //             doctorWorkingDate: workingDate,
  //             shiftType: shift.shiftType,
  //             startTime: shift.startTime,
  //             endTime: shift.endTime,
  //             slotDurationMinutes: shift.slotDurationMinutes,
  //             colorName: shift.colorName ?? null,
  //             status: DoctorShiftStatus.DIRTY,
  //           });

  //           await manager.save(doctorShift);

  //           /**
  //            * 3️⃣ Create selected DoctorSlots only
  //            */
  //           const slotEntities = selectedSlots.map((slot) =>
  //             manager.create(DoctorSlot, {
  //               doctorId,
  //               doctorShift: doctorShift,
  //               doctorShiftId: doctorShift.id,
  //               date,
  //               startTime: slot.start,
  //               endTime: slot.end,
  //               status: DoctorSlotStatus.AVAILABLE,
  //             }),
  //           );

  //           await manager.save(DoctorSlot, slotEntities);
  //         }
  //       }
  //     });
  //   }

  async createDoctorSchedule(payload: WorkdayDoctorsDto[]): Promise<void> {
    console.log('[createDoctorSchedule] START', {
      workdays: payload,
    });

    await this.datasource.transaction(async (manager) => {
      for (const workday of payload) {
        const { date, doctors } = workday;

        const today = dayjs().startOf('day');
        const workdayDate = dayjs(date).startOf('day');

        if (workdayDate.isBefore(today, 'day')) {
          throw new BadRequestException(
            `Ngày ${date} phải lớn hơn hoặc bằng ngày hiện tại`,
          );
        }

        for (const doctorItem of doctors) {
          const { doctorId, shift, selectedSlots } = doctorItem;
          /**
           * 1️⃣ INSERT DoctorWorkingDate
           */
          const workingDateExists = await manager.findOne(DoctorWorkingDate, {
            where: {
              doctor: { id: doctorId },
              date,
            },
            relations: ['doctor'],
          });
          if (workingDateExists) {
            throw new BadRequestException(
              `Đã tồn tại lịch làm việc cho bác sĩ ${workingDateExists.doctor.name} trong ngày ${date} rồi nhé!`,
            );
          }

          const workingDate = await manager.save(
            manager.create(DoctorWorkingDate, {
              doctor: { id: doctorId },
              date,
            }),
          );

          console.log('[DoctorWorkingDate] inserted', {
            workingDateId: workingDate.id,
          });

          /**
           * 2️⃣ INSERT DoctorShift
           */
          console.log('[DoctorShift] inserting...', {
            workingDateId: workingDate.id,
            shiftType: shift.shiftType,
            startTime: shift.startTime,
            endTime: shift.endTime,
          });
          console.log('type: ', typeof shift.slotDurationMinutes);

          const doctorShift = await manager.save(
            manager.create(DoctorShift, {
              doctorWorkingDate: { id: workingDate.id },
              shiftType: shift.shiftType,
              startTime: shift.startTime,
              endTime: shift.endTime,
              slotDurationMinutes: shift.slotDurationMinutes,
              colorName: shift.colorName ?? null,
              status: DoctorShiftStatus.DIRTY,
            }),
          );

          console.log('[DoctorShift] inserted', {
            doctorShiftId: doctorShift.id,
          });

          /**
           * 3️⃣ BULK INSERT DoctorSlots
           */
          const slotValues = selectedSlots.map((slot) => ({
            doctorId,
            doctorShiftId: doctorShift.id,
            date,
            startTime: slot.start,
            endTime: slot.end,
            status: DoctorSlotStatus.AVAILABLE,
          }));

          console.log('[DoctorSlot] bulk inserting...', {
            doctorShiftId: doctorShift.id,
            slotsCount: slotValues.length,
            sampleSlot: slotValues[0], // xem 1 slot mẫu
          });

          await manager
            .createQueryBuilder()
            .insert()
            .into(DoctorSlot)
            .values(slotValues)
            .execute();

          console.log('[DoctorSlot] inserted', {
            doctorShiftId: doctorShift.id,
            insertedSlots: slotValues.length,
          });
        }
      }
    });

    console.log('[createDoctorSchedule] DONE');
  }
}
