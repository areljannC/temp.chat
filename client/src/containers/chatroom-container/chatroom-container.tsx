// EXTERNAL IMPORTS
import React, { FunctionComponent, useContext, useState, useRef, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import {
  Flex,
  VStack,
  HStack,
  Box,
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
import { CONFIG } from '@constants';
import { getTimestamp } from '@utils';

// LOCAL IMPORTS
import { ChatBox } from './components';

const MESSAGES = [
  {
    user: { uuid: 'uuid_test', name: 'name_test' },
    room: { uuid: 'uuid_test', name: 'name_test' },
    message: 'message_test',
    timestamp: 1234567890
  }
];

// Component
const ChatroomContainer: FunctionComponent = () => {
  const wsRef = useRef<WebSocket>(undefined);
  const chatBoxRef = useRef(undefined);

  // useEffect(() => {
  //   wsRef.current = new WebSocket(CONFIG.WEBSOCKET_PATH);

  //   wsRef.current.onopen = () => {
  //     wsRef.current.send(JSON.stringify({
  //       timestamp: getTimestamp(),
  //       type: 
  //     }));
  //   }

  //   wsRef.current.onmessage = () => {};

  //   wsRef.current.onclose = () => {};

  //   return () => wsRef.current.close();
  // }, []);

  return (
    <Flex width='50%' height='100%'>
      <ChatBox messages={MESSAGES} />
    </Flex>
  );
};

// Display Name
ChatroomContainer.displayName = 'ChatroomContainer';

export default dynamic(() => Promise.resolve(memo(ChatroomContainer)), { ssr: false });
