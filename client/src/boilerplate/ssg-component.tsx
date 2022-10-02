// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';
import { GetStaticProps } from 'next';

// SHARED IMPORTS
// ...

// LOCAL IMPORTS
// ...

// Types
type PropsType = {
  content: string;
};

// SSG
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      content: 'SSG Content'
    }
  };
};

// Component
const SSGComponent: FunctionComponent<PropsType> = (props: PropsType) => {
  return <Fragment>{props.content}</Fragment>;
};

// Display Name
SSGComponent.displayName = 'SSGComponent';

export default memo(SSGComponent);
