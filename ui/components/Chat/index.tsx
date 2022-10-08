import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Fab,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import ReactPortal from '../Portals'
import { useState } from 'react'
// import { useXMTP } from '../../contexts/XMTPContext'

const styles = {
  table: {
    minWidth: 350
  },
  chatWrapper: {
    position: 'fixed',
    display: 'block',
    boxSizing: 'border-box',
    bottom: 0,
    right: 0,
    marginBottom: 8,
    marginRight: 8,
    width: '30%',
    height: '50%',
    minWidth: '400px',
    minHeight: '400px',
    maxHeight: '700px'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  listedMessages: {
    height: 'calc(100% - 96px)',
    position: 'relative',
    overflowY: 'auto'
  },
  messageArea: {
    height: '100%',
    display: 'block',
    boxSizing: 'border-box'
  }
}

interface IChatProps {
  open: boolean
}

const Chat = ({ open }: IChatProps) => {
  const [seeConversations, setSeeConversations] = useState(false)
  // const { conversations } = useXMTP()

  const messages = [
    {
      isSender: true,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: true,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: false,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: true,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: false,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: true,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: true,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: false,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    },
    {
      isSender: false,
      primary: "Hey man, What's up ?",
      secondary: '09:31'
    }
  ]

  return (
    <ReactPortal>
      <Fade timeout={600} in={open}>
        <Grid container component={Paper} sx={styles.chatWrapper}>
          <IconButton
            sx={{ position: 'absolute', zIndex: 1 }}
            onClick={() => setSeeConversations(true)}
          >
            <MailIcon />
          </IconButton>
          <Drawer
            sx={{
              height: '100%',
              position: 'absolute',
              width: '100%',
              flexShrink: 0,

              '& .MuiDrawer-paper': {
                maxWidth: '50%',
                position: 'absolute',
                transition: 'none !important'
              }
            }}
            ModalProps={{
              style: { position: 'absolute' }
            }}
            variant="persistent"
            anchor={'left'}
            open={seeConversations}
            onClose={() => setSeeConversations(false)}
          >
            <Box
              height={'100%'}
              role="presentation"
              onClick={() => setSeeConversations(false)}
            >
              <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? (
                            <InboxIcon />
                          ) : (
                            <MailIcon />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? (
                          <InboxIcon />
                        ) : (
                          <MailIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          {/* <Grid item xs={3} sx={styles.borderRight500}>
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="John Wick"></ListItemText>
              </ListItem>
            </List>
            <Divider />
            <Grid item xs={12} style={{ padding: '10px' }}>
              <TextField
                id="outlined-basic-email"
                label="Search"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Divider />
            <List>
              <ListItem button key="RemySharp">
                <ListItemIcon>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Remy Sharp">
                  Remy Sharp
                </ListItemText>
                <ListItemText
                  secondary="online"
                  sx={{ textAlign: 'right' }}
                ></ListItemText>
              </ListItem>
              <ListItem button key="Alice">
                <ListItemIcon>
                  <Avatar
                    alt="Alice"
                    src="https://material-ui.com/static/images/avatar/3.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Alice">Alice</ListItemText>
              </ListItem>
              <ListItem button key="CindyBaker">
                <ListItemIcon>
                  <Avatar
                    alt="Cindy Baker"
                    src="https://material-ui.com/static/images/avatar/2.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Cindy Baker">
                  Cindy Baker
                </ListItemText>
              </ListItem>
            </List>
          </Grid> */}
          <Grid item xs={12} sx={styles.messageArea}>
            {/* <List sx={styles.messageArea}> */}
            <List sx={styles.listedMessages}>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{
                          textAlign: message.isSender
                            ? 'right'
                            : 'left'
                        }}
                        primary={message.primary}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        sx={{
                          textAlign: message.isSender
                            ? 'right'
                            : 'left'
                        }}
                        secondary={message.secondary}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" aria-label="add">
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </ReactPortal>
  )
}

export default Chat
