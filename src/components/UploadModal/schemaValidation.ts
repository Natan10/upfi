import { z } from "zod";

const schemaValidation = z.object({
  title: z
    .string({ required_error: "Titulo obrigatorio" })
    .min(1, { message: "Titulo obrigatorio" }),
  description: z.string().optional(),
  photo: z.any().superRefine((val, ctx) => {
    if (!!val && val.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Arquivo obrigatorio",
        fatal: true,
      });

      return z.NEVER;
    }

    if (val[0].size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Arquivo muito grande",
        fatal: true,
      });
      return z.NEVER;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(val[0].type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tipo nao permitido",
        fatal: true,
      });
      return z.NEVER;
    }
  }),
});

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE = 300000; // 293 kb

export { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, schemaValidation };
