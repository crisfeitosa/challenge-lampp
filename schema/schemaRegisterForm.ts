import { z } from 'zod';

export const schemaRegisterForm = z
  .object({
    fullName: z
      .string()
      .regex(new RegExp(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/), 'Por favor, insira o primeiro nome e o sobrenome.')
      .regex(new RegExp(/^[a-zA-Z]+\s+[a-zA-Z]+$/), 'Por favor, insira o primeiro nome e o sobrenome.')
      .min(2, 'O nome deve ter pelo menos 2 letras.'),
    personalDocument: z.string().length(14, 'Por favor, informe um CPF válido'),
    birthday: z.coerce
      .date()
      .min(new Date(1923, 0, 1), {
        message: 'A data não pode passar de 1º de janeiro de 1923',
      })
      .max(new Date(), { message: 'Cliente deve ter 18 anos ou mais' })
      .refine(
        (date) => {
          const ageDifMs = Date.now() - date.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);

          return age >= 18;
        },
        { message: 'Cliente deve ter 18 anos ou mais' }),
    gender: z.string(),
    email: z.string().email('Por favor, informe o email do cliente.'),
    phone: z.string().length(15, 'Por favor, informe o telefone do cliente.'),
  })
  .refine((field) => field.gender.length, {
    path: ['gender'],
    message: 'Por favor, selecione uma opção',
  })
  .transform((field) => ({
    fullName: field.fullName,
    personalDocument: field.personalDocument,
    birthday: field.birthday,
    gender: field.gender,
    email: field.email,
    phone: field.phone,
  }));
