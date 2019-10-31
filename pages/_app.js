import React from 'react';
import App from 'next/app';
import theme from 'services/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'services/GlobalStyle';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
