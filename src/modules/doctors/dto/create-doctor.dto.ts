import {
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class CreateDoctorDto {
  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  externalId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsUUID()
  specialty: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  facility?: string;

  @IsInt()
  @Min(0)
  experienceYears: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsString()
  avatar?: string;
}
