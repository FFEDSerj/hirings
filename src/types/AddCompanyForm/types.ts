import { z } from 'zod';

export type AddCompanyProps = {
  onCloseForm?: () => void;
};

export const FormData = z.object({
  companyName: z
    .string()
    .min(2, 'Must contain at least 2 characters long')
    .trim(),
  ceo: z.string().trim().optional(),
  email: z.string().email('Please provide valid Email'),
  staff: z.number().optional(),
  budget: z.number().optional(),
});

export type FormDataType = z.infer<typeof FormData>;

export type ErrorMap = {
  [Key in keyof FormDataType]?: {
    message: string;
  };
};
