import React from 'react';
import GlobalStyles from './src/components/layout/globalStyles';

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
);
