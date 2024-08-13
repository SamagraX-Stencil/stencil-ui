import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Home, Menu } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

type Icon = {
  id: string;
  src: string;
};

type NavbarProps = {
  brandName?: string;
  onToggle: () => void;
  isOpen: boolean;
  showHamburgerMenu?: boolean;
  leftHomeIcon?: Icon[];
  showHomeIcon?: boolean;
  centerLogoIcons?: Icon[];
  rightLogoIcons?: Icon[];
  style?: {
    appBar?: object;
    toolbar?: object;
    leftSection?: object;
    centerSection?: object;
    rightSection?: object;
  };
  children?: React.ReactNode;
};

const NewNavbar: React.FC<NavbarProps> = ({
  brandName,
  onToggle,
  isOpen,
  showHamburgerMenu = true,
  showHomeIcon = false,
  leftHomeIcon = [],
  centerLogoIcons = [],
  rightLogoIcons = [],
  style = {},
  children,
}) => {
  return (
    <>
      <AppBar position="static" sx={{ ...style.appBar }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', ...style.toolbar }}>
          <div style={{ display: 'flex', alignItems: 'center', ...style.leftSection }}>
            {showHamburgerMenu && (
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="open drawer"
                sx={{ mr: 2, width: '50px', height: '50px' }}
                onClick={onToggle}
              >
                <Menu sx={{ fontSize: '50px' }} />
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
                    src={leftHomeIcon[0]?.src}
                    alt={`Left Home Icon ${leftHomeIcon[0]?.id}`}
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
              ...style.centerSection,
            }}
          >
            {centerLogoIcons &&
              centerLogoIcons.map((logo: { id: string; src: string }) => (
                <img
                  key={logo.id}
                  src={logo.src}
                  alt={`Logo ${logo.id}`}
                  style={{ maxHeight: '60px' }}
                />
              ))}

            {brandName && (
              <Typography variant="h6" color="inherit" sx={{ marginTop: 1, fontSize: '1.5rem' }}>
                {brandName}
              </Typography>
            )}
          </div>

          {rightLogoIcons && (
            <div style={style.rightSection}>
              {rightLogoIcons?.map((logo: { id: string; src: string }) => (
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

      {/* <Sidebar isOpen={isOpen} onToggle={onToggle} /> */}
      {children}
    </>
  );
};

export default NewNavbar;
