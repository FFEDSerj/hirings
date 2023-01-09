import { Mode } from '@prisma/client';
import { z } from 'zod';

const StringMinMaxTrim = z
  .string()
  .min(2, 'Must contain at least 2 characters long')
  .max(40, 'No more than 40 chars long')
  .trim();

export const FormData = z.object({
  title: StringMinMaxTrim,
  position: StringMinMaxTrim,
  salary: z.number().positive().int(),
  mode: z.nativeEnum(Mode),
  description: z.string().max(200),
});

export type FormDataType = z.infer<typeof FormData>;

export type FormDataKeys = keyof FormDataType;

export type FieldErrors = {
  [Key in FormDataKeys]: string | undefined;
};
