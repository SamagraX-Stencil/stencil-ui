import { Download, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
import AccordionCard from '../accordian-card';

type OuterAccordion = {
  title: string;
  date: string;
  index: number;
};
interface CardProps {
  key?: string | number;
  bgcolor?: string;
  textColor?: string;
  name?: string;
  secondaryText?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  buttonStyle?: SxProps<Theme> | undefined;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  icon?: string;
  InfoCard?: React.ReactNode;
  isAccordion?: boolean;
}
type Props = {
  outerAccordion: OuterAccordion;
  results: CardProps[];
};

const DynamicCard = React.memo(({ outerAccordion, results }: Props) => {

  // Declare InfoCard inside DynamicCard
  const InfoCard = ({ result }: { result: any }) => {

    // Function to determine the color based on the score/value
    const getColor = (value: number) => (value === 0 ? "red" : value === 1 ? "green" : "grey");

    // Render the transcript or result depending on the available data
    const renderContent = () => {
      if (result?.result && result.result.length > 0) {
        return result.result.map((qa: any, index: number) => (
          <Box key={index} mb={2}>
            <Box fontWeight={600} mb={1}>
              Q: {qa.question}
            </Box>
            <Box style={{ color: getColor(qa.score) }}>
              A: {qa.answer}
            </Box>
          </Box>
        ));
      }

      if (result?.transcript && result?.transcript?.length > 0) {
        return (
          <p style={{ textAlign: 'justify' }}>
            {result.transcript.map((item: any, index: number) => {
              const word = Object.keys(item)[0];
              const value = item[word];
              return (
                <span key={index} style={{ color: getColor(value), marginRight: "4px" }}>
                  {word}{' '}
                </span>
              );
            })}
          </p>
        );
      }

      return <p>No transcript or result available</p>;
    };

    return (
      <Box bgcolor={"white"} p={2} borderRadius={1} boxShadow={1}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          justifyContent={"space-between"}
        >
          <Box>{result?.title?.sub_label || "सब्दों की सुचि"}</Box>
          <Download />
        </Box>
        <hr />
        <Box fontSize={"16px"} fontWeight={600}>
          {renderContent()}
        </Box>
      </Box>
    );
  };

  return (
    <Accordion key={outerAccordion.title}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          cursor: 'pointer',
          width: '100%',
          marginTop: '14px',
          borderRadius: '8px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor:
            outerAccordion.title === 'निपुण'
              ? 'var(--successSecondary)'
              : 'var(--failureSecondary)',
          color: outerAccordion.title === 'निपुण' ? 'var(--success)' : 'var(--failure)',
          border: 'none',
          maxHeight: '64px',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={'16px'} fontWeight={600}>
            {outerAccordion.title}
          </Typography>
          <Typography fontSize={'10px'}>
            आकलन : {outerAccordion.date}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor:
            outerAccordion.title === 'निपुण'
              ? 'var(--successSecondary)'
              : 'var(--failureSecondary)',
        }}
      >
        {results?.length &&
          results?.map((el: any) => {
            return (
              <AccordionCard
                key={el?.competency_id}
                bgcolor={
                  el?.status == 'pass' ? 'var(--successSecondary)' : 'var(--failureSecondary)'
                }
                icon={el?.title?.icon || ''}
                textColor={el?.status == 'pass' ? 'var(--success)' : 'var(--failure)'}
                name={el?.title?.label}
                buttonText={el?.achievement}
                buttonStyle={{
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: el?.status == 'pass' ? 'var(--success)' : 'var(--failure)',
                  '&:hover': {
                    backgroundColor: el?.status == 'pass' ? 'var(--success)' : 'var(--failure)',
                  },
                }}
                InfoCard={() => <InfoCard result={el} />}
                isAccordion
              />
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
});

export default DynamicCard;
