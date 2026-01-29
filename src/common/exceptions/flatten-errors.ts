import { ValidationError } from 'class-validator';

export function flattenErrors(errors: ValidationError[]): string[] {
  return errors.flatMap((err) => {
    if (err.constraints) {
      return Object.values(err.constraints);
    }

    if (err.children && err.children.length > 0) {
      return flattenErrors(err.children);
    }

    return [];
  });
}
