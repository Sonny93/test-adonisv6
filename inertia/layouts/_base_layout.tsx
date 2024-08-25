import { ChakraProvider } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';

const BaseLayout = ({ children }: PropsWithChildren) => (
  <ChakraProvider>{children}</ChakraProvider>
);
export default BaseLayout;
