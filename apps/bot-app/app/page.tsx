'use client'

import Head from 'next/head'
import { CookiesProvider } from 'react-cookie'
import { useLocalization } from '@samagra-x/stencil-hooks'
import { HomePage } from '@samagra-x/stencil-pages'
import { useBotConfig } from '@samagra-x/stencil-hooks'

export default function Home() {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  const homeConfig = useBotConfig('component', 'homePage')

  return (
    <>
      <Head>
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
          <HomePage />
        </div>
      </CookiesProvider>
    </>
  )
}
