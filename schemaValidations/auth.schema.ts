import z from "zod";

const SignInBody = z.object({
  username: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be no longer than 20 characters." })
    .regex(/[A-Za-z0-9@$!%*?&]/, {
      message:
        "Password must contain at least one special character, number, or letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character.",
    }),
});

// const RegisterBody = z.object({
//   email: z.string().email("Invalid email address."),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long." })
//     .max(20, { message: "Password must be no longer than 20 characters." })
//     .regex(/[A-Za-z0-9@$!%*?&]/, {
//       message:
//         "Password must contain at least one special character, number, or letter.",
//     })
//     .regex(/\d/, { message: "Password must contain at least one number." })
//     .regex(/[@$!%*?&]/, {
//       message: "Password must contain at least one special character.",
//     }),

//   // Adding username field with validation
//   username: z
//     .string()
//     .min(3, { message: "Username must be at least 3 characters long." })
//     .max(20, { message: "Username must be no longer than 20 characters." }),
// });
export { SignInBody };
export type SignInBodyType = z.TypeOf<typeof SignInBody>;

export const SigninRes = z.object({
  data: z.object({
    access_token: z.string(),
    user: z.object({ username: z.string(), role: z.string() }),
  }),
  message: z.string(),
  statusCode: z.number(),
});
export type SigninResType = z.TypeOf<typeof SigninRes>;
export const validateEmailBody = z.object({
  email: z.string().email("Invalid email address."),
  code: z.string(),
});
export type validateEmailBodyType = z.TypeOf<typeof validateEmailBody>;
export const validateEmailRes = z.object({
  data: z.object({ message: z.string() }),
  message: z.string(),
  status: z.number(),
});
export type validateEmailResType = z.TypeOf<typeof validateEmailRes>;

export const RegisterFormBody = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(20, { message: "Password must be no longer than 20 characters." })
      .regex(/[A-Za-z0-9@$!%*?&]/, {
        message:
          "Password must contain at least one special character, number, or letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),
    reenterPassword: z
      .string()
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      })
      .max(20, {
        message: "Password confirmation must be no longer than 20 characters.",
      })
      .regex(/[A-Za-z0-9@$!%*?&]/, {
        message:
          "Password confirmation must contain at least one special character, number, or letter.",
      })
      .regex(/\d/, {
        message: "Password confirmation must contain at least one number.",
      })
      .regex(/[@$!%*?&]/, {
        message:
          "Password confirmation must contain at least one special character.",
      }),
  })
  .refine((data) => data.password === data.reenterPassword, {
    message: "Passwords do not match",
    path: ["reenterPassword"],
  });

export type RegisterFormBodyType = z.infer<typeof RegisterFormBody>;

export const RegisterBody = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be no longer than 20 characters." })
    .regex(/[A-Za-z0-9@$!%*?&]/, {
      message:
        "Password must contain at least one special character, number, or letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character.",
    }),
});

export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const RegisterRes = z.object({
  data: z.object({ username: z.string(), email: z.string() }),
  message: z.string(),
  statusCode: z.number(),
});
export type RegisterResType = z.infer<typeof RegisterRes>;
