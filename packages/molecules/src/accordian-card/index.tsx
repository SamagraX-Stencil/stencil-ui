import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export interface CardProps {
  key: string | number;
  bgcolor: string;
  textColor: string;
  name: string;
  secondaryText?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  buttonStyle?: SxProps<Theme> | undefined;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  icon?: string;
  InfoCard: (props: any) => React.ReactNode;
  isAccordion?: boolean;
}

const AccordionCard: React.FC<CardProps> = ({
  key,
  bgcolor,
  textColor,
  name,
  secondaryText,
  buttonText,
  buttonVariant,
  buttonStyle,
  onButtonClick,
  onClick,
  icon,
  isAccordion = false,
  InfoCard,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleAccordionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (isAccordion) {
      setExpanded(!expanded);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <Accordion
      expanded={expanded}
      sx={{
        cursor: 'pointer',
        width: '100%',
        borderRadius: '8px',
        marginTop: '14px',
        boxShadow: 'none !important',
        backgroundColor: bgcolor,
        border: 'none !important',
      }}
      onClick={handleAccordionClick}
    >
      <AccordionSummary
        aria-controls={`panel-${key}-content`}
        id={`panel-${key}-header`}
        sx={{
          cursor: 'pointer',
          width: '100%',
          borderRadius: '8px',
          marginTop: '14px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor: bgcolor,
          border: 'none',
          maxHeight: '64px',
        }}
      >
        <Box display="flex" alignItems="center" gap={2} justifyContent="space-between" width="100%">
          <Box display="flex" alignItems="center" gap={1}>
            {icon && (
              <Box>
                <img src={icon} width={30} height={30} alt="icon" />
              </Box>
            )}
            <Box>
              <Typography component="p" sx={{ color: textColor, fontWeight: '600' }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: textColor, fontSize: '12px' }}>
                {secondaryText}
              </Typography>
            </Box>
          </Box>
          {buttonText && !isAccordion && (
            <Box>
              <Button
                variant={buttonVariant}
                size="large"
                sx={buttonStyle}
                onClick={handleButtonClick}
              >
                {buttonText}
              </Button>
            </Box>
          )}
          {isAccordion && (
            <Box
              p="6px"
              bgcolor={textColor}
              color="#fff"
              fontWeight={600}
              fontSize={'13px'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              borderColor={bgcolor}
            >
              {buttonText}{' '}
              <ExpandMore
                sx={{
                  transform: expanded ? 'rotate(-180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor: 'white',
          borderRadius: '4px',
          margin: '8px',
        }}
      >
        <InfoCard />
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionCard;
