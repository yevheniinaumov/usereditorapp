import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export default function ListUserData (props: { list: any; }) {
  const list = props.list
  return <>
    <List>
      {list.map((el: any, index: React.Key) => {
        const firstFieldValue = el[0] + ': '
        const secondField: any = el.at(-1)
        let secondFieldValue = ''
        let optionalFieldValue

        if (typeof secondField === 'object') {
          optionalFieldValue = Object.entries(secondField)
        } else {
          secondFieldValue = secondField
        }
        return (
          <ListItem key={firstFieldValue + index} disablePadding>
            <ListItemText disableTypography secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="overline"
                >
                  {firstFieldValue}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                >
                  {secondFieldValue}
                </Typography>
                {optionalFieldValue &&
                  <Box sx={{
                    '& > *': {
                      mx: 1,
                    },
                  }}>
                    <List>
                      {optionalFieldValue.map((el, index) => {
                        const firstFieldValue = el[0] + ': '
                        const secondField: any = el.at(-1)
                        let secondFieldValue = ''
                        let optionalFieldValue

                        if (typeof secondField === 'object') {
                          optionalFieldValue = Object.entries(secondField)
                        } else {
                          secondFieldValue = secondField
                        }
                        return (
                          <ListItem key={firstFieldValue + index} disablePadding>
                            <ListItemText disableTypography secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="overline"
                                >
                                  {firstFieldValue}
                                </Typography>
                                <Typography
                                  component="span"
                                  variant="caption"
                                >
                                  {secondFieldValue}
                                </Typography>
                                {optionalFieldValue &&
                                  <Box sx={{
                                    '& > *': {
                                      mx: 1,
                                    },
                                  }}>
                                    <List>
                                      {optionalFieldValue.map((el, index) => {
                                        const firstFieldValue = el[0] + ': '
                                        const secondFieldValue: any = el.at(-1)

                                        return (
                                          <ListItem key={firstFieldValue + index}
                                                    disablePadding>
                                            <ListItemText disableTypography
                                                          secondary={
                                                            <React.Fragment>
                                                              <Typography
                                                                component="span"
                                                                variant="overline"
                                                              >
                                                                {firstFieldValue}
                                                              </Typography>
                                                              <Typography
                                                                component="span"
                                                                variant="caption"
                                                              >
                                                                {secondFieldValue}
                                                              </Typography>
                                                            </React.Fragment>
                                                          }
                                            />
                                          </ListItem>
                                        )
                                      })}
                                    </List>
                                  </Box>
                                }
                              </React.Fragment>
                            }
                            />
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>
                }
              </React.Fragment>
            }
            />
          </ListItem>
        )
      })
      }
    </List>
  </>
}
