import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'services/theme';
import GlobalStyle from 'services/GlobalStyle';
import NProgress from 'nprogress';
import Router from 'next/router';
import registerGoogleTracking from 'services/ga-tracking';
import App from 'next/app';
import { Nav } from 'components/organisms';
import '@zeit-ui/style/dist/style.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    console.log('app mounted');
    console.log('env', process.env.GA_TRACKING_ID);
    console.log(router);
    const unregisterGoogleTracking = registerGoogleTracking(router);
    return unregisterGoogleTracking();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Nav />
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
