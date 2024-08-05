import type { NextPage } from 'next';
import Head from 'next/head';
import { CookiesProvider } from 'react-cookie';
import { useLocalization } from '../hooks/useLocalization';
import ChatPage from '../pageComponents/new-chat-page';
import { useConfig } from '../hooks/useConfig';

const Chat: NextPage = () => {
  const t = useLocalization();
  const config = useConfig('component', 'botDetails');
  const homeConfig = useConfig('component', 'homePage');
  return (
    <>
      <Head>
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="white" />
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>

      <CookiesProvider>
        <div
          style={{
            position: 'fixed',
            width: '100%',
            bottom: '1vh',
            top: homeConfig?.topGap || '75px',
          }}
        >
          <ChatPage />
        </div>
      </CookiesProvider>
    </>
  );
};
export default Chat;
