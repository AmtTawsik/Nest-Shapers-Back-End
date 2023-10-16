import { z } from 'zod';

const create = z.object({
  body: z.object({
    heading: z.string().optional(),
    subHeading: z.string().optional(),
    aboutUsText: z.string().optional(),
    aboutUsImage: z.string().optional(),
    ceoStatement: z.string().optional(),
    ceoName: z.string().optional(),
    ceoImage: z.string().optional(),
    companyAddress: z.string().optional(),
    companyContactNo: z.string().optional(),
    companyEmail: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    heading: z.string().optional(),
    subHeading: z.string().optional(),
    aboutUsText: z.string().optional(),
    aboutUsImage: z.string().optional(),
    ceoStatement: z.string().optional(),
    ceoName: z.string().optional(),
    ceoImage: z.string().optional(),
    companyAddress: z.string().optional(),
    companyContactNo: z.string().optional(),
    companyEmail: z.string().optional(),
  }),
});

export const validationSchema = {
  create,
  update,
};
