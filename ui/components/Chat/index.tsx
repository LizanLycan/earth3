import {
  Box,
  CardContent,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useStreamingMessages } from '../../contexts/StreamingMessages'
import CustomCard from '../CustomCard'

const styles = {
  table: {
    minWidth: 350
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

const Chat = () => {
  const [seeConversations, setSeeConversations] = useState(false)
  const { publishMessage, messages } = useStreamingMessages()

  const sendMessage = async (e: any) => {
    e.preventDefault()

    if (e.target.social_input.value) {
      console.log('PUBLISHING: ', e.target.social_input.value)
      publishMessage?.(e.target.social_input.value)
    }
  }

  return (
    <Fade timeout={600} in={true}>
      <Box>
        <Typography variant="h5">Social</Typography>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4"></Typography>
          </Grid>
          <Grid item xs={12} sx={styles.messageArea}>
            {/* <List sx={styles.messageArea}> */}
            <List sx={styles.listedMessages}>
              {messages?.map((message, index) => (
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
                <form onSubmit={sendMessage}>
                  <TextField
                    id="social_input"
                    name="social_input"
                    label="Type Something"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="primary"
                            aria-label="add"
                            type="submit"
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

export default Chat
