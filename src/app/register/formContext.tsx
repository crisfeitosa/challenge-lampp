import { useState, createContext, PropsWithChildren, useContext } from 'react';
import { RegisterFormProps } from '../../../@types/types';

interface IFormContextValues {
  updateRegisterFormValues: (values?: RegisterFormProps) => void;
  stepRegisterFormValues?: RegisterFormProps;
}

const FormContext = createContext({} as IFormContextValues);

export function FormContextProvider({ children }: PropsWithChildren) {
  const [stepRegisterFormValues, setStepRegisterFormValues] = useState<RegisterFormProps>();

  function updateRegisterFormValues(values?: RegisterFormProps) {
    setStepRegisterFormValues(values);
  }
 
  return(
    <FormContext.Provider value={{ updateRegisterFormValues, stepRegisterFormValues }}>
      { children }
    </FormContext.Provider>
  )
} 

export const useFormContext = () => {
  return useContext(FormContext)
}
