import { z } from 'zod';

import { schemaAddressForm } from '../schema/schemaAddressForm';
import { schemaRegisterForm } from '../schema/schemaRegisterForm';

export type AddressFormProps = z.infer<typeof schemaAddressForm>;
export type RegisterFormProps = z.infer<typeof schemaRegisterForm>;

export type AddressProps = {
  bairro: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: string;
}

export type ClientProps = {
  id: number;
  birthday: string,
  city: string,
  complement: string,
  disabled: boolean,
  district: string,
  email: string,
  fullName: string,
  gender: string,
  number: string,
  personalDocument: string,
  phone: string,
  referencePoint: string,
  state: string,
  street: string,
  zipCode: string,
}
