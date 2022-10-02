// EXTERNAL IMPORTS
import React, { FunctionComponent, Fragment, memo } from 'react';

// SHARED IMPORTS
import { HomeContainer } from '@containers';

// TO DO: Setup SEO.

// Component
const HomePage: FunctionComponent = () => {
  return (
    <Fragment>
      <HomeContainer />
    </Fragment>
  );
};

// Display Name
HomePage.displayName = 'HomePage';

export default memo(HomePage);
