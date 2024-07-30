import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Home, Menu } from '@mui/icons-material';

import Typography from '@mui/material/Typography';
import { Sidebar } from '../sidebar/index';
// import ThemePicker from '../../components/theme-picker'
import { useColorPalates, useUiConfig } from '@samagra-x/stencil-hooks';

type Icon = {
  id: string;
  src: string;
};

type NavbarProps = {
  brandName?: string;
  onToggle: () => void;
  isOpen: boolean;
  showHamburgerMenu?: boolean;
  leftHomeIcon?: Icon;
  showHomeIcon?: boolean;
  centerLogoIcons?: Icon[];
  rightLogoIcons?: Icon[];
};

const Navbar: React.FC = () => {
  const config = useUiConfig('component', 'navbar');

  const theme = useColorPalates();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };
  console.log('config from nav: ', config);
  return (
    <>
      <AppBar position="static" sx={{ background: theme.primary.dark }}>
        <Toolbar style={{ display: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {config.showHamburgerMenu && (
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={toggleSidebar}
              >
                <Menu />
              </IconButton>
            )}
            {config.showHomeIcon && (
              <div>
                <IconButton
                  color="primary"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{ fontSize: '2rem', height: '48px' }}
                >
                  <Home />
                </IconButton>
                {config.leftHomeIcon && (
                  <img
                    src={config.leftHomeIcon.src}
                    alt={`Left Home Icon ${config.leftHomeIcon.id}`}
                    style={{ maxHeight: '48px' }}
                  />
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {config.logos.showCenterLogos &&
              config.logos.centerLogoIcons.map((logo: { id: string; src: string }) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}

            {config.brandName && (
              <Typography variant="h6" color="inherit" sx={{ marginTop: 1, fontSize: '1.5rem' }}>
                {config.brandName}
              </Typography>
            )}
          </div>

          {config.logos.showRightLogos && (
            <div>
              {config.logos.rightLogoIcons.map((logo: { id: string; src: string }) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Right Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}
            </div>
          )}
          {/* <ThemePicker /> */}
        </Toolbar>
      </AppBar>

      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
    </>
  );
};

export default Navbar;

const NewNavbar: React.FC<NavbarProps> = ({
  brandName,
  onToggle,
  isOpen,
  showHamburgerMenu = true,
  showHomeIcon = false,
  leftHomeIcon = {},
  centerLogoIcons = [],
  rightLogoIcons = [],
}) => {
  const theme = useColorPalates();

  return (
    <>
      <AppBar position="static" sx={{ background: theme.primary.dark }}>
        <Toolbar style={{ display: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {showHamburgerMenu && (
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={onToggle}
              >
                <Menu />
              </IconButton>
            )}
            {showHomeIcon && (
              <div>
                <IconButton
                  color="primary"
                  size="large"
                  edge="start"
                  aria-label="home"
                  style={{ fontSize: '2rem', height: '48px' }}
                >
                  <Home />
                </IconButton>
                {leftHomeIcon && (
                  <img
                    src={leftHomeIcon.src}
                    alt={`Left Home Icon ${leftHomeIcon.id}`}
                    style={{ maxHeight: '48px' }}
                  />
                )}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}
          >
            {centerLogoIcons &&
              centerLogoIcons.map((logo: { id: string; src: string }) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}

            {brandName && (
              <Typography variant="h6" color="inherit" sx={{ marginTop: 1, fontSize: '1.5rem' }}>
                {brandName}
              </Typography>
            )}
          </div>

          {rightLogoIcons && (
            <div>
              {rightLogoIcons.map((logo: { id: string; src: string }) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Right Logo ${logo.id}`}
                  style={{ maxHeight: '48px' }}
                />
              ))}
            </div>
          )}
          {/* <ThemePicker /> */}
        </Toolbar>
      </AppBar>

      <Sidebar isOpen={isOpen} onToggle={onToggle} />
    </>
  );
};

export { NewNavbar };
