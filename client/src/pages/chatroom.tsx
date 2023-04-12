// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';

// SHARED IMPORTS
import { ChatroomContainer } from '@containers';

// TO DO: Setup SEO.

// Component
const ChatroomPage: FunctionComponent = () => {
  // TO DO: Handle edge-case when there's no user or room set.

  return (
    <Fragment>
      <ChatroomContainer />
    </Fragment>
  );
};

// Display Name
ChatroomPage.displayName = 'ChatroomPage';

export default memo(ChatroomPage);
