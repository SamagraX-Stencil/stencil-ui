import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { FeedbackPage } from '@samagra-x/stencil-pages'
import { useLocalization } from '@samagra-x/stencil-hooks'
import { useBotConfig } from '@samagra-x/stencil-hooks'

const Feedback: NextPage = () => {
  const t = useLocalization()
  const config = useBotConfig('component', 'botDetails')
  return (
    <React.Fragment>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      <FeedbackPage />
    </React.Fragment>
  )
}

export default Feedback
