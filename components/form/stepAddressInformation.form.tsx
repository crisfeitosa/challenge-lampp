"use client";

import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button
} from '@chakra-ui/react'; 
import { useFormContext } from '../../src/app/register/formContext';
import { AddressProps, AddressFormProps } from '../../@types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { zipCodeMask } from '../../utils/zipCodeMask';
import { api } from '../../services/api';
import { schemaAddressForm } from '../../schema/schemaAddressForm';

interface IStepAddressInformationProps {
  completeFormStep: () => void;
}

export default function StepAddressInformation({ completeFormStep }: IStepAddressInformationProps) {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<AddressFormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaAddressForm),
    defaultValues: {
      zipCode: '',
      street: '',
      number: '',
      referencePoint: '',
      district: '',
      complement: '',
      city: '',
      state: '',
    }
  });
  const { stepRegisterFormValues } = useFormContext();
  const zipCode = watch('zipCode');

  const onHandleSubmit = async (values: AddressFormProps) => {
    const newClientData = JSON.stringify({
      ...stepRegisterFormValues,
      ...values,
      disabled: false,
    });
    const customConfig = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
    }};

    try {
      await api
        .post('/clients', newClientData, customConfig)
        .then(() => {
          completeFormStep();
          reset();
        })
    } catch(error) {
      console.log(error);
    }
  }

  const handleSetDataAddress = useCallback((dataAddress: AddressProps) => {
    const { bairro, complemento, localidade, logradouro, uf } = dataAddress;

    setValue('city', localidade);
    setValue('complement', complemento);
    setValue('district', bairro);
    setValue('street', logradouro);
    setValue('state', uf);
  }, [setValue]);

  const handleFetchAddress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(`
      https://viacep.com.br/ws/${zipCode}/json/`
    );

    handleSetDataAddress(data);
  }, [handleSetDataAddress]);

  useEffect(() => {
    setValue('zipCode', zipCodeMask(zipCode));

    if(zipCode.length !== 9) return;

    handleFetchAddress(zipCode);
  }, [handleFetchAddress, zipCode, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off'>
        <Heading>
          <Text color='gray.200' fontSize='2xl'>Informações de endereço</Text>
        </Heading>
        <FormControl isInvalid={!!errors.zipCode?.message} marginTop='24px'>
          <FormLabel color='gray.200'>CEP</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            maxLength={9}
            {...register('zipCode')}
          />
          <FormErrorMessage>{errors.zipCode?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.street?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Rua</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('street')}
          />
          <FormErrorMessage>{errors.street?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.number?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Número</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('number')}
          />
          <FormErrorMessage>{errors.number?.message}</FormErrorMessage>
        </FormControl>
        <FormControl marginTop='16px'>
          <FormLabel color='gray.200'>Ponto de referência</FormLabel>
          <Input
            type="text"
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('referencePoint')}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.district?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Bairro</FormLabel>
          <Input
            type="text"
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('district')}
          />
          <FormErrorMessage>{errors.district?.message}</FormErrorMessage>
        </FormControl> 
        <FormControl marginTop='16px'>
          <FormLabel color='gray.200'>Complemento</FormLabel>
          <Input
            type="text"
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('complement')}
          />
        </FormControl>
        <FormControl isInvalid={!!errors.city?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Cidade</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('city')}
          />
          <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.state?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Estado</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('state')}
          />
          <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
        </FormControl>
        <Button
          type='submit'
          width='full'
          isDisabled={!isValid}
          bgColor='green.400'
          mt={4}
          color='gray.200'
          _hover={{
            color: 'black'
          }}
        >
          Cadastrar cliente
        </Button>
      </form>
    </>
  )
}
