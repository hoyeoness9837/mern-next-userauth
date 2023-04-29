import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Layout from '@/components/layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>Mern-Next-Auth</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
