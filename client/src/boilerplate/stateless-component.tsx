// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';

// SHARED IMPORTS
// ...

// LOCAL IMPORTS
// ...

// Types
type PropsType = {
  data?: any
};

// Component
const StatelessComponent: FunctionComponent<PropsType> = (props: PropsType) => {
  return <Fragment>{props.data}</Fragment>;
};

// Display Name
StatelessComponent.displayName = 'StatelessComponent';

export default memo(StatelessComponent);
