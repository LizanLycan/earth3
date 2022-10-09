import {
  Box,
  Button,
  CardContent,
  Divider,
  Drawer,
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
import { useEffect, useState } from 'react'
import { useStreamingMessages } from '../../contexts/StreamingMessages'
import CustomCard from '../CustomCard'

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
  const { subscribeMessages, publishMessage } = useStreamingMessages()

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

  useEffect(() => {
    subscribeMessages?.(onMessage)
  }, [])

  const sendMessage = async () => {
    publishMessage?.('Holis wuenas, qlq')
  }

  const onMessage = async (content: any, metadata: any) => {
    console.log('IS Comming: ', content, metadata)
  }

  return (
    <ReactPortal>
      <Fade timeout={600} in={open}>
        <Grid container component={Paper} sx={styles.chatWrapper}>
          <Button onClick={sendMessage}>Send message</Button>

          <Grid item xs={12} sx={styles.messageArea}>
            {/* <List sx={styles.messageArea}> */}
            <List sx={styles.listedMessages}>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <Grid
                    container
                    justifyContent={
                      message.isSender ? 'flex-end' : 'flex-start'
                    }
                  >
                    <Grid item>
                      <CustomCard
                        color={
                          message.isSender ? 'primary' : undefined
                        }
                      >
                        <CardContent>
                          <ListItemText
                            sx={{
                              textAlign: message.isSender
                                ? 'right'
                                : 'left'
                            }}
                            primary={message.primary}
                          ></ListItemText>
                          <ListItemText
                            sx={{
                              textAlign: message.isSender
                                ? 'right'
                                : 'left'
                            }}
                            secondary={message.secondary}
                          ></ListItemText>
                        </CardContent>
                      </CustomCard>
                    </Grid>
                    <Grid item xs={12}></Grid>
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
                        <IconButton
                          color="primary"
                          aria-label="add"
                          onClick={sendMessage}
                        >
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
