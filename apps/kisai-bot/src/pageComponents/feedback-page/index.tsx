import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useConfig } from '../../hooks/useConfig';
import axios from 'axios';
import { useLocalization } from '../../hooks';
import Menu from '../../components/menu';

const FeedbackPage: React.FC = () => {
  const [star, setStar] = useState(1);
  const [review, setReview] = useState('');
  const theme = useColorPalates();
  const config = useConfig('component', 'feedbackPage');
  const t = useLocalization();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BFF_API_URL}/feedback/${localStorage.getItem('userID')}`, {
        headers: {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
        },
      })
      .then((res) => {
        setStar(res?.data?.rating);
        setReview(res?.data?.review);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFeedback = () => {
    if (!config) return;

    if (config?.ratingBox && star === 0) {
      toast.error('Please provide a rating');
      return;
    }

    if (config?.reviewBox && review === '') {
      toast.error('Please provide a review');
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BFF_API_URL}/feedback/${localStorage.getItem('userID')}`,
        {
          rating: star,
          review: review,
        },
        {
          headers: {
            botId: process.env.NEXT_PUBLIC_BOT_ID || '',
            orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          },
        }
      )
      .then(() => {
        toast.success('Feedback submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again later.');
      });
  };

  return (
    <div className={styles.container}>
      <Box className={styles.main}>
        <Box>
          <Typography
            data-testid="feedback-title"
            sx={{
              fontSize: '5vh',
              fontWeight: 'bold',
              color: theme.primary.main,
            }}
          >
            {t('label.feedback')}
          </Typography>
        </Box>

        {config?.ratingBox && (
          <Box className={styles.section}>
            <Typography
              data-testid="feedback-rating-title"
              sx={{
                fontWeight: 'bold',
                fontSize: '3vh',
              }}
            >
              {t('message.rating')}
            </Typography>

            <Rating
              data-testid="feedback-rating-component"
              name="simple-controlled"
              value={star}
              max={config?.ratingMaxStars || 5}
              onChange={(event, newValue) => {
                setStar(newValue || 1);
              }}
              defaultValue={1}
              sx={{
                fontSize: '6vh',
              }}
            />
            <Typography
              data-testid="feedback-rating-description"
              sx={{
                textAlign: 'center',
                fontSize: '2vh',
              }}
            >
              {t('message.rating_description')}
            </Typography>
            <Button
              data-testid="feedback-rating-button"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: `${theme.primary.main}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme.primary.dark}`,
                },
              }}
              onClick={handleFeedback}
            >
              {t('label.submit_review')}
            </Button>
          </Box>
        )}

        {config?.reviewBox && (
          <Box className={styles.section}>
            <Typography
              data-testid="feedback-review-title"
              sx={{
                m: '1rem',
                fontWeight: 'bold',
                fontSize: '3vh',
              }}
            >
              {t('message.review')}
            </Typography>
            <textarea
              data-testid="feedback-review-component"
              placeholder={t('message.review_description')}
              value={review}
              className={styles.textBlock}
              style={{
                border: `2px solid ${theme.primary.main}`,
              }}
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />

            <Button
              id="reviewBtn"
              variant="contained"
              data-testid="feedback-review-button"
              sx={{
                mt: 2,
                backgroundColor: `${theme.primary.main}`,
                fontWeight: 'bold',
                borderRadius: '10rem',
                fontSize: '1.5vh',
                p: 1.5,
                '&:hover': {
                  backgroundColor: `${theme.primary.dark}`,
                },
              }}
              onClick={handleFeedback}
            >
              {t('label.submit_review')}
            </Button>
          </Box>
        )}
      </Box>

      <Menu />
    </div>
  );
};

export default FeedbackPage;
