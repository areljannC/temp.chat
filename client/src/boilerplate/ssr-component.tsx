// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';
import { GetServerSideProps } from 'next';

// SHARED IMPORTS
// ...

// LOCAL IMPORTS
// ...

// Types
type PropsType = {
  content: string;
};

// SSR
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      content: 'SSR Content'
    }
  };
};

// Component
const SSRComponent: FunctionComponent<PropsType> = (props: PropsType) => {
  return <Fragment>{props.content}</Fragment>;
};

// Display Name
SSRComponent.displayName = 'SSRComponent';

export default memo(SSRComponent);
