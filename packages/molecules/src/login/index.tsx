import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import LoginInput from '../login-input';

type InputType = 'mobile' | 'password' | 'email' | 'aadhaar';

interface LoginProps {
  title?: string;
  onLogin: (value: string | number) => void;
  // jwksUrl?: string;
  // nextRoute?: string;
  type: InputType;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  buttonText;
  string;
}

const LoginComponent: React.FC<LoginProps> = ({
  title,
  onLogin,
  // jwksUrl,
  // nextRoute,
  buttonText,
  type,
  value,
  onChange,
  placeholder,
}) => {
  const handleLogin = () => {
    onLogin(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <LoginInput type={type} value={value} onChange={onChange} placeholder={placeholder} />
      <Button variant="contained" color="primary" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default LoginComponent;
