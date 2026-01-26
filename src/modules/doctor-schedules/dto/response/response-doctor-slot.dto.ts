import { Type } from 'class-transformer';
import { SlotTimeRangeResponseDto } from './response-slot-time-range.dto';
export class DoctorSlotsResponseDto {
  doctorId: string;

  @Type(() => SlotTimeRangeResponseDto)
  selectedSlots: SlotTimeRangeResponseDto[];
}
