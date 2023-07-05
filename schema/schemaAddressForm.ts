import { z } from 'zod';

export const schemaAddressForm = z
  .object({
    zipCode: z.string().min(9, 'Por favor, informe um CEP válido'),
    street: z.string().min(1, 'Por favor, informe uma rua válida'),
    number: z.string().min(1, 'Por favor, informe um número válido'),
    referencePoint: z.string(),
    district: z.string().min(1, 'Por favor, informe um bairro válido'),
    complement: z.string(),
    city: z.string().min(1, 'Por favor, informe uma cidade válida'),
    state: z.string().min(1, 'Por favor, informe um estado válido'),
  })
  .transform((field) => ({
    zipCode: field.zipCode,
    street: field.street,
    number: field.number,
    referencePoint: field.referencePoint,
    district: field.district,
    complement: field.complement,
    city: field.city,
    state: field.state,
  }));
