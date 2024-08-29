import React, { useState, useContext, useEffect } from 'react';
import HelpIcon from '@mui/icons-material/QuestionMark';
import FeedbackIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useConfig } from '../../hooks/useConfig';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import router from 'next/router';
import { useCookies } from 'react-cookie';
import { AppContext } from '../../context';
import { useLocalization } from '../../hooks';
import BhashiniImg from '../../assets/images/bhashinilogo.png';
import darshanLogo from '../../assets/images/darshan-logo.png';
import styles from './style.module.css';
import Image from 'next/image';
import NewSidebar from '@samagra-x/stencil-molecules/lib/sidebar/sidebar';
import { SelectChangeEvent } from '@mui/material';

export const Sidebar = ({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) => {
  const [activeLanguage, setActiveLanguage] = useState<string>(() => {
    const storedLang = localStorage.getItem('locale');
    if (storedLang && router?.query?.lang && storedLang !== router?.query?.lang) {
      localStorage.setItem('locale', (router?.query?.lang as string) ?? 'en');
    }
    return (router?.query?.lang as string) || storedLang || 'en';
  });

  const [cookie, setCookie, removeCookie] = useCookies();
  const context = useContext(AppContext);
  const config = useConfig('component', 'sidebar');
  const theme = useColorPalates();
  const t = useLocalization();

  useEffect(() => {
    context?.setLocale(activeLanguage);
  }, [activeLanguage, context]);

  const handleLanguageClick = (event: SelectChangeEvent<string>) => {
    console.log('hjhjhjhjhj', event);
    setActiveLanguage(event.target.value);
    localStorage.setItem('locale', event.target.value);
    onToggle();
  };

  function logout() {
    removeCookie('access_token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
    context?.setMessages([]);
    router.push('/login');
    if (typeof window !== 'undefined') window.location.reload();
  }

  console.log('debug', { config });
  return (
    <NewSidebar
      isOpen={isOpen}
      onToggle={onToggle}
      showProfileIcon={true}
      showLangSwitcher={true}
      profileText={t('label.welcome')}
      links={[
        {
          label: t(`label.chats`),
          icon: <ChatBubbleOutlineIcon sx={{ fontSize: '35px' }} />,
          route: '/history',
        },
        { label: t(`label.faqs`), icon: <HelpIcon sx={{ fontSize: '35px' }} />, route: '/faq' },
        {
          label: t(`label.feedback`),
          icon: <FeedbackIcon sx={{ fontSize: '35px' }} />,
          route: '/feedback',
        },
      ]}
      handleLogOutButton={logout}
      languages={[
        {
          name: 'ENG',
          value: 'en',
        },
        {
          name: 'हिंदी',
          value: 'hi',
        },
      ]}
      activeLanguage={activeLanguage}
      handleLanguageClick={handleLanguageClick}
      style={{
        sidebar: {
          background: config?.sidebarBackground ?? theme.primary.main,
        },
        drawer: {
          width: 300,
          height: '100dvh',
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
          backgroundColor: config?.sidebarBackground ?? theme.primary.main,
        },
        list: {
          background: config?.sidebarBackground ?? theme.primary.main,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        icon: {
          color: theme.primary.contrastText,
        },
        listItemButton: {
          color: theme.primary.contrastText,
        },
        profileText: {
          color: theme.primary.contrastText,
        },
        listItem: {
          paddingTop: '10px',
          paddingBottom: '10px',
          color: theme.primary.contrastText,
          marginTop: '10px',
          marginBottom: '10px',
        },
      }}
      langPickerStyle={{
        formControlStyle: {
          background: theme?.primary?.main,
        },
        selectStyle: {
          color: theme?.primary?.contrastText,
        },
      }}
    >
      {(config?.showBhashiniLogo || config?.showDarshanLogo) && (
        <div
          className={styles.user}
          style={{
            background: 'var(--bg-color)',
            flexDirection: 'column',
            fontSize: '12px',
          }}
        >
          <div
            style={{
              color: 'var(--secondarygreen)',
              textAlign: 'left',
              width: '100%',
            }}
          >
            Powered by:
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {config?.showBhashiniLogo && <Image src={BhashiniImg} alt="" width={180} height={45} />}
            {config?.showDarshanLogo && <Image src={darshanLogo} alt="" width={55} height={45} />}
          </div>
        </div>
      )}
    </NewSidebar>
  );
};

export default Sidebar;
