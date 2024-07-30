import React, { ReactNode } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type CustomStyles = {
  modal?: React.CSSProperties;
  box?: React.CSSProperties;
  heading?: React.CSSProperties;
  okButton?: React.CSSProperties;
  cancelButton?: React.CSSProperties;
  buttonContainer?: React.CSSProperties;
};
type StencilModalProps = {
  showModal: boolean;
  children?: ReactNode;
  height?: number | string;
  width?: number | string;
  heading?: string;
  handleCancelButton: () => void;
  handleActionButton?: () => void;
  customStyles?: CustomStyles;
};
const StencilModal: React.FC<StencilModalProps> = ({
  showModal,
  children,
  height,
  width,
  heading,
  handleCancelButton,
  handleActionButton,
  customStyles = {},
}) => {
  const {
    modal: modalStyle = {},
    box: boxStyle = {},
    heading: headingStyle = {},
    okButton: okButtonStyle = {},
    cancelButton: cancelButtonStyle = {},
    buttonContainer: buttonContainerStyle = {},
  } = customStyles;
  return (
    <Modal
      open={showModal}
      onClose={handleCancelButton}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={modalStyle}
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width || 400,
          height: height,
          bgcolor: 'background.paper',
          borderRadius: '8px',
          boxShadow: 24,
          p: 4,
          ...boxStyle,
        }}
      >
        <Typography id="modal-modal-title" sx={{ fontSize: '16px', ...headingStyle }}>
          {heading}
        </Typography>

        {children}
        <div
          style={{
            display: 'flex',
            justifyContent: handleActionButton ? 'space-between' : 'flex-end',
            margin: '10px 0 0 0',
            ...buttonContainerStyle,
          }}
        >
          {handleActionButton && (
            <Button
              variant="outlined"
              onClick={handleActionButton}
              style={{ height: '32px', ...okButtonStyle }}
            >
              OK
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={handleCancelButton}
            style={{ height: '32px', ...cancelButtonStyle }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default StencilModal;
