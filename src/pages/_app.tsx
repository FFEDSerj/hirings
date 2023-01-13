import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Navigation from '../components/Navigation';
import { ToastContainer } from 'react-toast';

import { trpc } from '../utils/trpc';

import '../styles/globals.css';

export type SessionType = {
  session: Session | null;
};

const MyApp: AppType<SessionType> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Navigation />
      <Component {...pageProps} />
      <ToastContainer position="bottom-center" delay={2500} />
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
