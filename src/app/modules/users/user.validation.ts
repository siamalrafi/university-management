import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is Required',
    }),
    password: z.string().optional(),
  }),
});
// console.log('createUserZodValidation', createUserZodValidation)

export const userValidation = {
  createUserZodSchema,
};
