import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

// Create root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// Performance measuring (optional)
reportWebVitals();
