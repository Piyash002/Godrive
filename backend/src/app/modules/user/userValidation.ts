import z from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmpassword: z.string().trim(),
    number: z.string(),
    profile_image: z.string().optional(),
    refreshToken: z.string().optional(),
  }),
});

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});
