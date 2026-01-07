import { BaseMapper } from 'src/common/base/base.mapper';
import { DoctorShift } from '../entities/doctor-shift.entity';
import { ResponseDoctorShift } from '../dto/response-doctor-shift.dto';

export class DoctorShiftMapper extends BaseMapper<
  DoctorShift,
  ResponseDoctorShift
> {
  toResponse(entity: DoctorShift): ResponseDoctorShift {
    return {
      id: entity.id,
      doctorId: entity.doctorId,
      shiftType: entity.shiftType,
      shiftDate: entity.shiftDate,
      startTime: entity.startTime,
      endTime: entity.endTime,
      slotDurationMinutes: entity.slotDurationMinutes,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
