import * as React from 'react'
import MuiList from '@mui/material/List'
import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Collapse,
} from '@mui/material'
import {
  ExpandLess,
  StarBorder,
  ExpandMore,
  ErrorOutline,
} from '@mui/icons-material'

import { ListType } from './types'
import { map } from 'lodash'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material'
import { useBotConfig } from 'stencil-hooks'

export const List: React.FC<ListType> = ({ items, label, noItem }) => {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  const config = useBotConfig('component', 'historyPage')

  const handleClick = React.useCallback(
    (id: string) => {
      if (id === openItem) setOpenItem(null)
      else setOpenItem(id)
    },
    [openItem]
  )

  const hasItems = React.useMemo(() => items?.length > 0, [items])

  if (!hasItems)
    return (
      <MuiList
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton>
          <ListItemIcon>
            {noItem?.icon ? React.cloneElement(noItem?.icon) : <ErrorOutline />}
          </ListItemIcon>
          <ListItemText primary={noItem?.label ?? 'Nothing available'} />
        </ListItemButton>
      </MuiList>
    )
  return (
    <MuiList
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <>{label && <ListSubheader component="div">{label}</ListSubheader>}</>
      }
    >
      {map(items, (item) => {
        console.log({ item })
        return (
          <>
            <ListItem secondaryAction={item?.secondaryAction ?? null}>
              <ListItemButton
                onClick={(ev) => {
                  ev.stopPropagation()
                  if (item?.items) {
                    return handleClick(item?.id)
                  }
                  if (item?.onClick) return item?.onClick(item)
                  return null
                }}
              >
                {item.icon && (
                  <ListItemIcon>{React.cloneElement(item.icon)}</ListItemIcon>
                )}
                {item.avatar && (
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src={item.avatar} />
                  </ListItemAvatar>
                )}
                {item.label && (
                  <ListItemText
                    primary={item.label}
                    secondary={
                      <React.Fragment>
                        {config?.showTimestamp && item?.secondaryLabel && (
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item?.secondaryLabel}
                          </Typography>
                        )}
                      </React.Fragment>
                    }
                  />
                )}
                {item?.items && (
                  <>{openItem === item?.id ? <ExpandLess /> : <ExpandMore />}</>
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openItem === item?.id} timeout="auto" unmountOnExit>
              <MuiList component="div" disablePadding>
                <ListItemButton sx={{ pl: 8 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItemButton>
              </MuiList>
            </Collapse>
            {item?.isDivider && <Divider />}
          </>
        )
      })}
    </MuiList>
  )
}