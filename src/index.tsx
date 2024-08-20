import React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

