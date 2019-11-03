import React from 'react';
import App from 'next/app';
import theme from 'services/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'services/GlobalStyle';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
