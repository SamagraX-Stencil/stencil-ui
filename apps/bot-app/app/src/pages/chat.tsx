'use-client'
import type { NextPage } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useLocalization } from '@samagra-x/stencil-hooks'
import { useContext } from 'react'
import { AppContext } from '@samagra-x/stencil-provider'
import styles from '../components/dialer-popup/index.module.css'
import DialerPopUp from '../components/dialer-popup'
import { useBotConfig } from '@samagra-x/stencil-hooks'
import { ChatUI } from '@samagra-x/stencil-molecules'

const Chat: NextPage = () => {
  const t = useLocalization()
  const context = useContext(AppContext)
  const config = useBotConfig('component', 'botDetails')
  console.log('hola', { config })
  return (
    <>
      <Head>
        <title>{t('label.tab_title')}</title>
        <link rel="icon" href={config?.favicon} />
      </Head>
      {context?.showDialerPopup && (
        <div
          className={styles.overlay}
          // onClick={() => context?.setShowDialerPopup(false)}
        >
          {/* Only render the DialerPopup component when showDialerPopup is true */}
          {context?.showDialerPopup && (
            <DialerPopUp setShowDialerPopup={context?.setShowDialerPopup} />
          )}
        </div>
      )}

      <div
        style={{
          position: 'fixed',
          width: '100%',
          bottom: '1vh',
          top: '100px',
        }}
      >
        <ChatUI />
      </div>
    </>
  )
}
export default Chat
