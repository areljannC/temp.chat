// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';

// Component
const ChatroomPage: FunctionComponent = () => {
  return (
    <Fragment>
      <div>Chatroom</div>
    </Fragment>
  );
};

// Display Name
ChatroomPage.displayName = 'ChatroomPage';

export default memo(ChatroomPage);
