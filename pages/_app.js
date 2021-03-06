import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'services/theme';
import GlobalStyle from 'services/GlobalStyle';
import NProgress from 'nprogress';
import Router from 'next/router';
import registerGoogleTracking from 'services/ga-tracking';
import App from 'next/app';
import { Nav, Sponsors } from 'components/organisms';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@zeit-ui/style/dist/style.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const unregisterGoogleTracking = registerGoogleTracking(router);
    return unregisterGoogleTracking();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer transition={Zoom} />
      <Nav />
      <Sponsors />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
