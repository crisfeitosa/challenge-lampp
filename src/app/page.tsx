"use client";

import { useEffect, useState } from "react";
import { Avatar, Badge, Box, Button, ButtonGroup, Center, Checkbox, Flex, FormControl, Input, Select, Stack, Text, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";
import { AddIcon, PhoneIcon } from '@chakra-ui/icons';
import { FaCity } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { api } from '../../services/api';
import ModalMoreDetailsClient from "../../components/modalMoreDetailsClient";
import { ClientProps } from "../../@types/types";

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [clients, setClients] = useState<ClientProps[]>([]);
  const [clientMoreDetails, setClientMoreDetails] = useState<ClientProps>();
  const [searchValue, setSearchValue] = useState('');

  const loadClientsData = async () => {
    return await api
      .get('/clients?disabled=false')
      .then((response) => setClients(response.data as ClientProps[]))
      .catch((err) => console.error(err));
  };

  const handleMoreDetails = (client: ClientProps) => {
    setClientMoreDetails(client);
    onOpen();
  };

  const handleSearch = async (event: any) => {
    event.preventDefault();

    if(!searchValue) {
      return
    }

    return await api
      .get(`/clients?q=${searchValue}`)
      .then((response) => {
        setClients(response.data as ClientProps[]);
        setSearchValue('');
      })
      .catch((err) => console.error(err));
  };

  const handleResetSearch = () => {
    loadClientsData();
  };

  const handleFilterUnavailable = async (event: any) => {
    const selectedTag = (event.target as HTMLInputElement).value;

    if (!selectedTag) {
      return loadClientsData();
    }

    return await api
      .get('/clients?disabled=true')
      .then((response) => {
        setClients(response.data as ClientProps[]);
        setSearchValue('');
      })
      .catch((err) => console.error(err));
  };

  const handleClientAvailable =  async (event: any, client: ClientProps) => {
    const e = (event.target as HTMLInputElement).value;
    const { id, disabled } = client;

    const updateClient = {
      ...client,
      disabled: !disabled,
    };

    return await api
      .put(`/clients/${id}`, updateClient)
      .then((response) => {
        loadClientsData();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadClientsData();
  }, []);

  return (
    <Flex
      width='full'
      justifyContent='space-between'
      backgroundColor='gray.900'
      flexDirection='column'
    >
      <Wrap justify='center' background='gray.700' p={6} mb={8} width='full'>
        <form onSubmit={handleSearch} autoComplete='off'>
          <FormControl>
            <Input
              type='text'
              border='none'
              outline='none'
              bgColor='gray.900'
              focusBorderColor='gray.600'
              color='gray.200'
              placeholder="Pesquisar por nome ou cidade"
              name='search'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </FormControl>
          <ButtonGroup minWidth='320px' spacing='4'>
            <Button
              type='submit'
              width='full'
              bgColor='blue.400'
              mt={4}
              color='gray.200'
              _hover={{
                color: 'black'
              }}
            >
              Pesquisar
            </Button>
            <Button
              type='button'
              width='full'
              bgColor='red.400'
              mt={4}
              color='gray.200'
              _hover={{
                color: 'black'
              }}
              onClick={() => handleResetSearch()}
            >
              Limpar pesquisa
            </Button>
          </ButtonGroup>
        </form>
      </Wrap>
      <Wrap justify='center' align='center' spacing='30px' px={6} mb={8} width='full'>
        <Box>
          <Button
            type='button'
            width='full'
            bgColor='green.400'
            color='gray.200'
            _hover={{
              color: 'black'
            }}
            onClick={() => router.push('/register')}
          >
            Adicionar novo cliente
          </Button>
        </Box>
        <Box>
          <Select background='gray.300' onChange={handleFilterUnavailable} placeholder='Filtrar cliente desabilitado'>
            <option value="unavailable">Desabilitado</option>
          </Select>  
        </Box>
      </Wrap>
      <Wrap spacing='30px' justify='center' p={6}>        
        {clients.length === 0 ? (
          <Text color='gray.300'>Não existem contatos</Text>
        ) : clients.map((client: ClientProps) => {
            return (
              <WrapItem key={client.id}>
                <Center w='320px' minHeight='80px' py={6} px={4} flexDirection='column' background='gray.100' boxShadow='lg' borderRadius='8px'>
                  <Avatar name={client.fullName} />
                  <Text my={4} fontWeight='700' color='blue.500'>{client.fullName}</Text>
                  <Stack direction='column' width='full'>
                    <Badge textAlign='center' p={2} background='gray.700' fontWeight='400' color='white' boxShadow='lg' borderRadius='8px'>
                      <PhoneIcon />{' '}
                      {client.phone}
                    </Badge>
                    <Badge textAlign='center' p={2} background='gray.700' display='flex' justifyContent='center' alignItems='center' gap={2} fontWeight='400' color='white' boxShadow='lg' borderRadius='8px'>
                      <FaCity />{' '}
                      {client.city}-{client.state}
                    </Badge>
                  </Stack>
                  <FormControl width='full' mt={4} display='flex' alignItems='center'>
                    <Checkbox borderColor='gray.700' isDisabled={client.disabled} isChecked={client.disabled} onChange={(e) => handleClientAvailable(e, client)}>
                      Cliente desabilitado
                    </Checkbox>
                  </FormControl>
                  <Button onClick={() => handleMoreDetails(client)} width='full' mt={4} rightIcon={<AddIcon />} colorScheme='blue' variant='outline'>
                    Mais detalhes
                  </Button>
                </Center>
              </WrapItem>
            )
        })}
      </Wrap>
      <ModalMoreDetailsClient isOpen={isOpen} onClose={onClose} informationClient={clientMoreDetails} />
    </Flex>
  )
}
