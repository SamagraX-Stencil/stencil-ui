/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  styled,
} from '@mui/material'
import {
  ArrowBackIosNewRounded,
  ArrowForward,
  CheckCircleRounded,
} from '@mui/icons-material'

import { useColorPalates } from '../../../provider/theme-provider/hooks'
import { useConfig } from '../../../provider/config-provider/hook'
import rice from './assets/rice.jpeg'
import wheat from './assets/wheat.png'
import more from './assets/more.png'
import { includes } from 'lodash'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#363A44',
  borderRadius: '5px',
  position: 'relative',
}))
const OptionSelector = () => {
  const config = useConfig('component', 'optionSelectorPage')
  const theme = useColorPalates()
  const [activeElements, setActiveElements] = React.useState<Array<any>>([])
  const vegetables = [
    { id: 1, label: 'गेहूँ', key: 'गेहूँ', image: rice },
    { id: 2, label: 'चावल', key: 'चावल', image: wheat },
    { id: 3, label: 'milk', key: 'milk', image: rice },
    { id: 4, label: 'आलू', key: 'आलू', image: wheat },
    { id: 5, label: 'गेहूँ', key: 'गेहूँ', image: wheat },
    { id: 6, label: 'चावल', key: 'आलू', image: rice },
    { id: 7, label: 'आलू', key: 'आलू', image: wheat },
    { id: 8, label: 'गेहूँ', key: 'आलू', image: rice },
    { id: 9, label: 'अन्य', key: 'more', image: more },
  ]

  const onItemClick = useCallback(
    (item: any) => () => {
      if (
        activeElements.length == (config?.optionSelectLength ?? 4) &&
        !activeElements?.includes(item?.id)
      ) {
        alert(`You can select only ${config?.optionSelectLength ?? 4} items`)
        return
      }
      setActiveElements((prev) =>
        prev?.includes(item?.id)
          ? prev?.filter((i) => i !== item?.id)
          : [...prev, item?.id]
      )
    },
    [activeElements, config?.optionSelectLength]
  )

  return (
    <Container>
      <div className="d-flex">
        <IconButton
          aria-label="fingerprint"
          style={{
            borderRadius: '12px',
            background: '',
            border: '1px solid #E8ECF4',
          }}
        >
          <ArrowBackIosNewRounded />
        </IconButton>
        <div className="text-center w-100">
          <p
            style={{
              lineHeight: '40px',
              fontSize: '24px',
              color: theme.primary.dark,
              fontWeight: 600,
            }}
          >
            {config?.topText}
          </p>
        </div>
      </div>

      <div className="text-center mt-3">
        <p style={{ color: '#51586B', fontSize: '18px' }}>
          {config?.centerText}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '70vh',
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 12 }}
            style={{ marginTop: '20px' }}
          >
            {vegetables.map((_) => (
              <Grid item xs={1} sm={4} md={4}>
                <Item
                  onClick={onItemClick(_)}
                  style={{
                    border: includes(activeElements, _?.id)
                      ? `1px solid ${theme.primary.dark}`
                      : '1px solid #B0B0B0',
                  }}
                >
                  {includes(activeElements, _?.id) && (
                    <div
                      className="rounded-circle position-absolute "
                      style={{
                        width: '20px',
                        height: '20px',
                        top: '0px',
                        left: '75%',
                      }}
                    >
                      <CheckCircleRounded color="success" />
                    </div>
                  )}
                  <img
                    src={_?.image.src}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <p style={{ lineHeight: '1rem' }} className="mt-2">
                    {_?.label}
                  </p>
                </Item>
              </Grid>
            ))}
          </Grid>
          <div>
            <Box sx={{ mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={activeElements.length < 4}
                endIcon={<ArrowForward />}
                sx={{
                  textTransform: 'none',
                  mt: 3,
                  mb: 4,
                  p: 1,
                  borderRadius: '10px',
                  background: theme.primary?.dark,
                  height: '60px',
                }}
              >
                {config?.btnText}
              </Button>
              <Link
                component="button"
                variant="body2"
                onClick={() => {}}
                className="mt-2"
              >
                {config?.helpingText1}
              </Link>
            </Box>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default OptionSelector
