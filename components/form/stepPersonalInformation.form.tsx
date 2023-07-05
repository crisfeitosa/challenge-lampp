import { useEffect } from 'react';
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  Button
} from '@chakra-ui/react';
import { useFormContext } from '../../src/app/register/formContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneMask } from '../../utils/phoneMask';
import { personalDocumentMask } from '../../utils/personalDocumentMask';
import { RegisterFormProps } from '../../@types/types';
import { schemaRegisterForm } from '../../schema/schemaRegisterForm';

interface IStepPersonalInformationProps {
  completeFormStep: () => void;
}

export default function StepPersonalInformation({ completeFormStep }: IStepPersonalInformationProps) {
  const {
    setValue,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<RegisterFormProps>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaRegisterForm),
    defaultValues: {
      fullName: '',
      personalDocument: '',
      birthday: undefined,
      gender: '',
      email: '',
      phone: '',
    }
  });
  const { updateRegisterFormValues } = useFormContext();
  
  const phone = watch('phone');
  const personalDocument = watch('personalDocument');

  const onHandleSubmit = (values: RegisterFormProps) => {
    updateRegisterFormValues(values);
    completeFormStep();
    reset();
  }

  useEffect(() => {
    setValue('phone', phoneMask(phone));
  }, [phone, setValue]);

  useEffect(() => {
    setValue('personalDocument', personalDocumentMask(personalDocument));
  }, [personalDocument, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)} autoComplete='off'>
        <Heading>
          <Text color='gray.200' fontSize='2xl'>Informações do cliente</Text>
        </Heading>
        <FormControl isInvalid={!!errors.fullName?.message} marginTop='24px'>
          <FormLabel color='gray.200'>Nome completo</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            id='fullName'
            {...register('fullName')}
          />
          <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.personalDocument?.message} marginTop='16px'>
          <FormLabel color='gray.200'>CPF</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('personalDocument')}
          />
          <FormErrorMessage>{errors.personalDocument?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.birthday?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Data de nascimento</FormLabel>
          <Input
            type="date"
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('birthday')}
          />
          <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.gender?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Sexo</FormLabel>
          <Select
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            placeholder='Selecione um gênero'
            {...register('gender')}
          >
            <option value='masculino'>Masculino</option>
            <option value='feminino'>Feminino</option>
          </Select>
          <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Email</FormLabel>
          <Input
            type='email'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone?.message} marginTop='16px'>
          <FormLabel color='gray.200'>Telefone</FormLabel>
          <Input
            type='text'
            border='none'
            outline='none'
            bgColor='gray.900'
            focusBorderColor='gray.600'
            color='gray.200'
            {...register('phone')}
          />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
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
          Próxima Etapa
        </Button>
      </form>
    </>
  )
}
