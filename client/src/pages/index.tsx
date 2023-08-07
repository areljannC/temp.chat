// EXTERNAL IMPORTS
import React, { FunctionComponent, memo } from "react";

const HomePage: FunctionComponent = () => (
  <div>
    <p>hello</p>
  </div>
);

HomePage.displayName = "HomePage";

export default memo(HomePage);
