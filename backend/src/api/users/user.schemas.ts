import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string().optional(),
  username: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-zA-Z0-9_-]+$/),
  password_hash: z.string(),
  userRole: z.enum(["basic", "trainer"]),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export const UserRequestParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[1-9]\d*$/, "Invalid id"),
  }),
});

export const UpdateUserSchema = z.object({
  params: UserRequestParamsSchema.shape.params,
  body: z
    .object({
      firstName: z.string().trim().min(1).max(255).optional(),
      lastName: z.string().trim().max(255).optional(),
      username: UserSchema.shape.username.optional(),
      userRole: z.enum(["basic", "trainer"]).default("basic").optional(),
    })
    .refine(
      (data) => {
        return (
          data.firstName !== undefined ||
          data.lastName !== undefined ||
          data.username !== undefined ||
          data.userRole !== undefined
        );
      },
      {
        message: "missing a field to update",
      }
    ),
});

export type User = z.infer<typeof UserSchema>;
export type UserRequestParams = z.infer<
  typeof UserRequestParamsSchema.shape.params
>;
export type UpdateUserBody = z.infer<typeof UpdateUserSchema.shape.body>;
