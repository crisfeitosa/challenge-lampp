import { AbsoluteCenter, Box, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, Wrap } from "@chakra-ui/react";
import { ClientProps } from "../../@types/types";

interface ModalMoreDetailsClientProps {
  isOpen: boolean;
  onClose: () => void;
  informationClient: ClientProps;
}

export default function ModalMoreDetailsClient({
  isOpen, onClose, informationClient,
}: ModalMoreDetailsClientProps) {

  const birthdayFormatted = new Date(informationClient?.birthday).toLocaleDateString('pt-BR');
  const streetWithNumber = `${informationClient?.street}${', '}${informationClient?.number}`;

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color='blue.700'>Informações do cliente</ModalHeader>
          <ModalCloseButton color='black' />
          <ModalBody pb={6} color='black'>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Nome: 
              </Text>
              <Text fontWeight='400'>{informationClient?.fullName}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                CPF: 
              </Text>
              <Text fontWeight='400'>{informationClient?.personalDocument}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Data de nascimento: 
              </Text>
              <Text fontWeight='400'>{birthdayFormatted}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Gênero: 
              </Text>
              <Text fontWeight='400'>{informationClient?.gender}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Email: 
              </Text>
              <Text fontWeight='400'>{informationClient?.email}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Telefone: 
              </Text>
              <Text fontWeight='400'>{informationClient?.phone}</Text>
            </Wrap>
            <Box position='relative' my={8}>
              <Divider />
              <AbsoluteCenter bg='white' color='blue.700' fontWeight='bold' px='4'>
                Dados de endereço
              </AbsoluteCenter>
            </Box>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                CEP: 
              </Text>
              <Text fontWeight='400'>{informationClient?.zipCode}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Endereço: 
              </Text>
              <Text fontWeight='400'>{streetWithNumber}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Complemento: 
              </Text>
              <Text fontWeight='400'>{informationClient?.complement}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Ponto de referência: 
              </Text>
              <Text fontWeight='400'>{informationClient?.referencePoint}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Bairro: 
              </Text>
              <Text fontWeight='400'>{informationClient?.district}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Cidade: 
              </Text>
              <Text fontWeight='400'>{informationClient?.district}</Text>
            </Wrap>
            <Wrap spacing='6px' flexDirection='row'>
              <Text fontWeight='bold' color='blue.700'>
                Estado: 
              </Text>
              <Text fontWeight='400'>{informationClient?.state}</Text>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
