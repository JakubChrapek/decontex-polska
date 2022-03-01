import React from 'react'
import Redirect from './src/components/langHelpers/redirect'
import GlobalStyles from './src/components/layout/globalStyles'
import '@fontsource/dm-sans' // Weight 500 with all styles included.
import "@fontsource/ibm-plex-sans"
import "@fontsource/poppins"

export const wrapRootElement = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
);
