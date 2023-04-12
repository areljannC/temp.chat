// EXTERNAL IMPORTS
import React, { ReactNode, FunctionComponent, memo } from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';

// Types
type PropsType = {
  timestamp: number;
  user: string;
  room: string;
  message: string;
  isReceived: boolean;
};

// Component
const ChatMessage: FunctionComponent<PropsType> = (props: PropsType) => {
  return (
    <VStack alignSelf={props.isReceived ? 'flex-start' : 'flex-end'}>
      <Box
        width='100%'
        height='fit-content'
        padding='2'
        color='white'
        backgroundColor='red'
        borderTopLeftRadius='xl'
        borderTopRightRadius='xl'
        borderBottomLeftRadius={props.isReceived ? 'none' : 'xl'}
        borderBottomRightRadius={props.isReceived ? 'xl' : 'none'}
      >
        <Text children={props.message} />
      </Box>
    </VStack>
  );
};

// Display Name
ChatMessage.displayName = 'ChatMessage';

export default memo(ChatMessage);
