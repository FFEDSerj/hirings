import { Mode } from '@prisma/client';
import { z } from 'zod';

export const FormData = z.object({
  title: z.string().min(2, 'Must contain at least 2 characters long').trim(),
  position: z.string().min(2, 'Must contain at least 2 characters long').trim(),
  salary: z.number().positive().finite(),
  mode: z.nativeEnum(Mode),
  description: z.string(),
});

export type FormDataType = z.infer<typeof FormData>;

export type FormDataKeys = keyof FormDataType;

export type FieldErrors = {
  [Key in FormDataKeys]: string | undefined;
};
