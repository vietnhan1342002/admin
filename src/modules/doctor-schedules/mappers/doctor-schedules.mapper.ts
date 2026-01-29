import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/common/base/base.mapper';
import { DoctorSlot } from '../entities/doctor-slot.entity';
import { DoctorWeeklySlotsResponseDto } from '../dto/response/response-weekly-doctor.dto';
import { DoctorSlotStatus } from '../enum/doctor-slot.enum';

@Injectable()
export class DoctorScheduleMapper extends BaseMapper<
  DoctorSlot[],
  DoctorWeeklySlotsResponseDto
> {
  toResponse(entities: DoctorSlot[]): DoctorWeeklySlotsResponseDto {
    const workdayMap = new Map<
      string,
      {
        date: string;
        doctors: {
          doctorId: string;
          selectedSlots: { start: string; end: string }[];
        }[];
      }
    >();

    for (const slot of entities) {
      // FE chỉ cần slot được chọn (available)
      if (slot.status !== DoctorSlotStatus.AVAILABLE) continue;

      // 1️⃣ Date level
      if (!workdayMap.has(slot.date)) {
        workdayMap.set(slot.date, {
          date: slot.date,
          doctors: [],
        });
      }

      const workday = workdayMap.get(slot.date)!;

      // 2️⃣ Doctor level
      let doctor = workday.doctors.find((d) => d.doctorId === slot.doctorId);

      if (!doctor) {
        doctor = {
          doctorId: slot.doctorId,
          selectedSlots: [],
        };
        workday.doctors.push(doctor);
      }

      // 3️⃣ Slot level
      doctor.selectedSlots.push({
        start: slot.startTime.slice(0, 5),
        end: slot.endTime.slice(0, 5),
      });
    }

    return {
      workdays: Array.from(workdayMap.values()).sort((a, b) =>
        a.date.localeCompare(b.date),
      ),
    };
  }
}
