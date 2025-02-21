import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import type { PropsWithChildren } from 'react';

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <MantineProvider>{children}</MantineProvider>
);
