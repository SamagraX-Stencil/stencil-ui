'use client'
import React, { useCallback } from 'react'
import styles from './index.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Hourglass from './hourglass'
import Typography from '@mui/material/Typography'
import { useColorPalates } from '../../provider/theme-provider/hooks'

const ComingSoonPage: React.FC = () => {
  const theme = useColorPalates()
  const handleBack = useCallback(() => {
    window?.history?.back()
  }, [])

  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      <Box my={15} className={styles.container}>
        <Box mt={5}>
          <Typography
            variant="h4"
            sx={{
              color: theme?.primary?.main,
              fontWeight: '700',
              marginTop: '50px',
            }}
          >
            Coming Soon!
            {/* {t('message.coming_soon')} */}
          </Typography>
        </Box>
        <Box>
          <Hourglass fillColor={theme?.primary?.main} />
        </Box>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: '600' }}>
            We are going to launch this feature very soon. Stay tuned!
            {/* {t('message.coming_soon_description')} */}
          </Typography>
        </Box>
        <Box my={5}>
          <Button
            variant="contained"
            className={styles.backButton}
            size="large"
            style={{ backgroundColor: theme?.primary?.main }}
            onClick={handleBack}
          >
            Back
            {/* {t('label.back')} */}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default ComingSoonPage
