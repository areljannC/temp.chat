// EXTERNAL IMPORTS
import React, { FunctionComponent, memo } from 'react';
import { VStack } from '@chakra-ui/react';

// LOCAL IMPORTS
import { ChatMessage } from '../';

// Types
type MessageType = {
  user: { uuid: string, name: string },
  room: { uuid: string, name: string },
  message: string,
  timestamp: number
};

type PropsType = {
  messages: Array<MessageType>;
};

// Component
const ChatBox: FunctionComponent<PropsType> = (props: PropsType) => {
  return (
    <VStack as='section' width='100%' height='100%'>
      {props.messages.map(({ timestamp, user, room, message }) => (
        <ChatMessage
          timestamp={timestamp}
          user={user.name}
          room={room.name}
          message={message}
          isReceived={true}
        />
      ))}
    </VStack>
  );
};

// Display Name
ChatBox.displayName = 'ChatBox';

export default memo(ChatBox);
