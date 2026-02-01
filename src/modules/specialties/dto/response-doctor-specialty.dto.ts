export class DoctorSlimResponseDto {
  id: string;
  slug: string;
  name: string;
  title?: string | null;
  avatar?: string | null;
  featured: boolean;
}

export class SpecialtySlimResponseDto {
  id: string;
  value: string;
  name: string;
  departmentId: string;
}
