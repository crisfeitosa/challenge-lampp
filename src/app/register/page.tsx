"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepPersonalInformation from "../../../components/form/stepPersonalInformation.form";
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import StepAddressInformation from '../../../components/form/stepAddressInformation.form';
import { FormContextProvider } from './formContext';

const MAX_STEPS = 2;

export default function Page() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep(cur => cur + 1)
  }

  return (
    <FormContextProvider>
      <Flex
        minHeight='100vh'
        width='full'
        align='center'
        justifyContent='center'
        backgroundColor='gray.900'
        px={6}
      >
        <Box
          px={6}
          py={6}
          width='full'
          maxWidth='450px'
          textAlign='center'
          background='gray.700'
          boxShadow='lg'
          borderRadius='8px'
        >
          {formStep < MAX_STEPS && (
            <Text color='gray.300' marginBottom={2}>Etapa {formStep + 1} de {MAX_STEPS}</Text>
          )}
          {formStep === 0 && (
            <StepPersonalInformation completeFormStep={completeFormStep} />
          )}
          {formStep === 1 && (    
            <StepAddressInformation completeFormStep={completeFormStep} />
          )}
          {formStep === 2 && (
            <>
              <Heading>
                <Text color='gray.200' marginBottom={4} fontSize='2xl'>Cliente cadastrado com sucesso!</Text>
              </Heading>
              <Button
                onClick={() => setFormStep(0)}
                type='button'
                width='full'
                bgColor='green.400'
                mt={4}
                color='gray.200'
                _hover={{
                  color: 'black'
                }}
              >
                Adicionar novo cliente
              </Button>
              <Button
                onClick={() => router.push('/')}
                type='button'
                width='full'
                bgColor='blue.400'
                mt={4}
                color='gray.200'
                _hover={{
                  color: 'black'
                }}
              >
                Listagem de clientes
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </FormContextProvider>
  )
}
