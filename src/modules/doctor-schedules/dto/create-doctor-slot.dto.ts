import { ArrayNotEmpty, IsArray, IsDateString, IsUUID } from 'class-validator';

export class CreateDoctorSlotsDto {
  @IsUUID()
  doctorId: string;

  @IsDateString()
  date: string;

  @IsArray()
  @ArrayNotEmpty()
  selectedSlots: string[];
}
