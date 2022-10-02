// EXTERNAL IMPORTS
import React, { FunctionComponent, useState, Fragment, memo } from 'react';

// SHARED IMPORTS
// ...

// LOCAL IMPORTS
// ...

// Types
type PropsType = {
  data?: any;
};

// Component
const StatefulComponent: FunctionComponent<PropsType> = (props: PropsType) => {
  const [state, setState] = useState('original state');

  const handleStateChange = () => setState('change state');

  return (
    <Fragment>
      <div onClick={handleStateChange}>{state}</div>
      <div>{props.data}</div>
    </Fragment>
  );
};

// Display Name
StatefulComponent.displayName = 'StatefulComponent';

export default memo(StatefulComponent);
