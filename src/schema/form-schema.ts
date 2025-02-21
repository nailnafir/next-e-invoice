import { z } from "zod";

export const ALLOWED_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const SignInFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email harus diisi")
    .min(2, { message: "Email minimal 2 karakter" })
    .max(30, { message: "Email maksimal 30 karakter" })
    .email("Format email tidak valid"),
  password: z
    .string()
    .nonempty("Password harus diisi")
    .min(8, { message: "Password minimal 8 karakter" })
    .max(30, { message: "Password maksimal 30 karakter" }),
});

export const SignUpFormSchema = SignInFormSchema.extend({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(30, { message: "Nama maksimal 30 karakter" }),
  confirmPassword: z
    .string({ required_error: "Password harus diisi" })
    .min(8, { message: "Password minimal 8 karakter" })
    .max(30, { message: "Password maksimal 30 karakter" }),
  phone: z
    .string({ required_error: "Nomor telepon harus diisi" })
    .min(10, { message: "Nomor telepon minimal 10 karakter" })
    .max(15, { message: "Nomor maksimal 15 karakter" }),
  address: z
    .string({ required_error: "Alamat harus diisi" })
    .min(8, { message: "Alamat minimal 8 karakter" })
    .max(80, { message: "Alamat maksimal 80 karakter" }),
});

export const PaymentConfirmationFormSchema = z.object({
  name: z
    .string({ required_error: "Nama harus diisi" })
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(30, { message: "Nama maksimal 30 karakter" }),
  accountNumber: z
    .number({ required_error: "Rekening harus diisi" })
    .min(2, { message: "Rekening minimal 2 karakter" })
    .max(30, { message: "Rekening maksimal 30 karakter" }),
  method: z
    .string({ required_error: "Metode harus diisi" })
    .min(2, { message: "Metode minimal 2 karakter" })
    .max(30, { message: "Metode maksimal 30 karakter" }),
  date: z.date({ required_error: "Tanggal harus diisi" }),
  amount: z
    .number({ required_error: "Nominal harus diisi" })
    .min(2, { message: "Nominal minimal 2 karakter" })
    .max(30, { message: "Nominal maksimal 30 angka" }),
  image: z
    .any({ required_error: "Foto harus diunggah" })
    .refine(
      (file) => file instanceof File && ALLOWED_MIME_TYPES.includes(file.type),
      { message: "Foto yang dipilih harus berupa gambar" }
    )
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, {
      message: "Ukuran file maksimal 5MB",
    }),
  description: z
    .string({ required_error: "Deskripsi harus diisi" })
    .min(12, { message: "Deskripsi minimal 12 karakter" })
    .max(100, { message: "Deskripsi maksimal 100 karakter" }),
  status: z
    .string()
    .min(2, { message: "Status minimal 2 karakter" })
    .max(30, { message: "Status maksimal 30 karakter" }),
});
