// EXTERNAL IMPORTS
import React, { FunctionComponent, useContext, useState, useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Flex,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Button,
  useColorModeValue
} from '@chakra-ui/react';

// SHARED IMPORTS
import { CONFIG, FETCH_STATUS, SOCKET_EVENT, PAGE_ROUTE } from '@constants';
import { SocketManagerContext } from '@contexts';
import { getTimestamp } from '@utils';

// LOCAL IMPORTS
import { FIELD, BUTTON } from './constants';
import FormValidationSchema from './form-validation-schema';

// Component
const HomeContainer: FunctionComponent = () => {
  // Context
  const { user, room, setUser, setRoom, socketRef } = useContext(SocketManagerContext);

  // States
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);

  // Hooks
  const router = useRouter();
  const { watch, control, handleSubmit, formState } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(FormValidationSchema),
    defaultValues: {
      [FIELD.NAME.NAME]: '',
      [FIELD.ROOM.NAME]: '',
      [FIELD.USE_PRIVATE_ROOM.NAME]: false,
      [FIELD.PASSWORD.NAME]: ''
    }
  });

  // Chakra UI color modes
  const background = useColorModeValue('black', 'white');
  const foreground = useColorModeValue('white', 'black');

  // Form watchers
  const watchIsPrivateRoom = watch(FIELD.USE_PRIVATE_ROOM.NAME);

  // Handlers
  const handleCreateRoom = async (formData) => {
    setFetchStatus(FETCH_STATUS.PENDING);

    try {
      // TO DO: Handle create room.
      const uuidResponses = await Promise.allSettled([
        fetch(`${CONFIG.SERVER_PATH}/uuid`).then((response) => response.json()),
        fetch(`${CONFIG.SERVER_PATH}/uuid`).then((response) => response.json())
      ]);

      // TO DO: Handle error responses.
      const uuids = uuidResponses.map((uuidResponse: any) => uuidResponse.value.data.uuid);
      const user = { uuid: uuids[0], name: formData.name };
      const room = { uuid: uuids[1], name: formData.name }

      setUser(user);
      setRoom(room);
      setFetchStatus(FETCH_STATUS.SUCCESS);

      // Setup WebSocket.
      socketRef.current = new WebSocket(CONFIG.WEBSOCKET_PATH);

      socketRef.current.onopen = () => {
        socketRef.current.send(
          JSON.stringify({
            timestamp: getTimestamp(),
            type: SOCKET_EVENT.ROOM.CREATE,
            data: { user, room }
          })
        );
      };

      socketRef.current.onmessage = () => {};

      socketRef.current.onclose = () => {};

      router.push(PAGE_ROUTE.CHATROOM);
    } catch (_) {
      // TO DO: Handle create room error.
      setFetchStatus(FETCH_STATUS.ERROR);
    }
  };

  const handleJoinRoom = async (formData) => {
    setFetchStatus(FETCH_STATUS.PENDING);

    try {
      // TO DO: Handle join room.
      const uuidResponses = await Promise.allSettled([
        fetch(`${CONFIG.SERVER_PATH}/uuid`).then((response) => response.json()),
        fetch(`${CONFIG.SERVER_PATH}/uuid`).then((response) => response.json())
      ]);

      // TO DO: Handle error responses.
      const uuids = uuidResponses.map((uuidResponse: any) => uuidResponse.value.data.uuid);
      const user = { uuid: uuids[0], name: formData.name };
      const room = { uuid: uuids[1], name: formData.name }

      setUser(user);
      setRoom(room);
      setFetchStatus(FETCH_STATUS.SUCCESS);

      // Setup WebSocket.
      socketRef.current = new WebSocket(CONFIG.WEBSOCKET_PATH);

      socketRef.current.onopen = () => {
        socketRef.current.send(
          JSON.stringify({
            timestamp: getTimestamp(),
            type: SOCKET_EVENT.ROOM.JOIN,
            data: { user, room }
          })
        );
      };

      socketRef.current.onmessage = () => {};

      socketRef.current.onclose = () => {};

      router.push(PAGE_ROUTE.CHATROOM);
    } catch (_) {
      // TO DO: Handle join room error.
      setFetchStatus(FETCH_STATUS.ERROR);
    }
  };

  // Effects
  useEffect(() => {
    return () => {
      setFetchStatus(FETCH_STATUS.IDLE);
    };
  }, []);

  return (
    <Flex
      width='100%'
      height='100%'
      justifyContent='space-around'
      alignItems='center'
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <VStack
        as='section'
        width={{ base: '100%', md: '50%' }}
        height={{ base: '50%', md: '100%' }}
        justifyContent='center'
      >
        <Heading as='h1' size='2xl' textAlign='center' children='temp.chat' />
        <Heading
          as='h2'
          size='lg'
          fontWeight='normal'
          textAlign='center'
          children='Temporary chatrooms for anonymous use.'
        />
      </VStack>
      <VStack
        as='form'
        width={{ base: '80%', sm: '70%', md: '30%' }}
        height={{ base: '50%', md: '100%' }}
        justifyContent='center'
        spacing={4}
      >
        <Controller
          control={control}
          name={FIELD.NAME.NAME}
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormLabel fontWeight='bold'>{FIELD.NAME.LABEL}</FormLabel>
              <Input
                type='text'
                color={foreground}
                backgroundColor={background}
                borderColor={foreground}
                id={FIELD.NAME.ID}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name={FIELD.ROOM.NAME}
          render={({ field, fieldState }) => (
            <FormControl isInvalid={!!fieldState.error}>
              <FormLabel fontWeight='bold'>{FIELD.ROOM.LABEL}</FormLabel>
              <Input
                type='text'
                color={foreground}
                backgroundColor={background}
                borderColor={foreground}
                id={FIELD.ROOM.ID}
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
              />
              <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name={FIELD.USE_PRIVATE_ROOM.NAME}
          render={({ field }) => (
            <FormControl>
              <HStack spacing={4}>
                <FormLabel marginBottom={0} fontWeight='bold'>
                  {FIELD.USE_PRIVATE_ROOM.LABEL}
                </FormLabel>
                <Checkbox
                  borderColor={background}
                  size='md'
                  isChecked={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
              </HStack>
            </FormControl>
          )}
        />
        {watchIsPrivateRoom && (
          <Controller
            control={control}
            name={FIELD.PASSWORD.NAME}
            render={({ field, fieldState }) => (
              <FormControl isInvalid={!!fieldState.error}>
                <FormLabel fontWeight='bold'>{FIELD.PASSWORD.LABEL}</FormLabel>
                <Input
                  type='text'
                  color={foreground}
                  backgroundColor={background}
                  borderColor={foreground}
                  id={FIELD.PASSWORD.ID}
                  value={field.value}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
                <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
        )}
        <Button
          width='100%'
          color='white'
          backgroundColor='green.600'
          type='submit'
          id={BUTTON.JOIN_ROOM.ID}
          name={BUTTON.JOIN_ROOM.NAME}
          children={BUTTON.JOIN_ROOM.LABEL}
          onClick={handleSubmit(handleJoinRoom)}
          isDisabled={!formState.isValid}
          isLoading={fetchStatus === FETCH_STATUS.PENDING}
        />
        <Button
          width='100%'
          color='white'
          backgroundColor='red.600'
          type='submit'
          id={BUTTON.CREATE_ROOM.ID}
          name={BUTTON.CREATE_ROOM.NAME}
          children={BUTTON.CREATE_ROOM.LABEL}
          onClick={handleSubmit(handleCreateRoom)}
          isDisabled={!formState.isValid}
          isLoading={fetchStatus === FETCH_STATUS.PENDING}
        />
      </VStack>
    </Flex>
  );
};

// Display Name
HomeContainer.displayName = 'HomeContainer';

export default memo(HomeContainer);
