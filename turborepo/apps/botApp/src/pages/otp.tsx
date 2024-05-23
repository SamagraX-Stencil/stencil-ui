import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useLocalization } from '@repo/hooks'
import { LocalOtpPage } from '@repo/pages'
import { useBotConfig } from '@repo/hooks'

const OTP: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <LocalOtpPage />
    </React.Fragment>
  )
}

export default OTP