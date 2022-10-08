import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '../src/Link'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'
import { Button, Card } from '@mui/material'
import { useWeb3 } from '../contexts/Web3Context'
import { StatusConnection } from '../contexts/Web3Context/types'
import Chat from '../components/Chat'
import TextEditor from '../components/TextEditor'
import { WorldIDWidget } from '@worldcoin/id'

const Home: NextPage = () => {
  const {
    login,
    logout,
    statusConnection,
    getUserInfo,
    addressConnected
  } = useWeb3()

  const [showChat, setShowChat] = React.useState(false)

  const getInfo = async () => {
    const res = await getUserInfo?.()

    console.log('USER INFOR RESPONSE: ', res)
  }

  return (
    <Container maxWidth="lg">
      <WorldIDWidget
        actionId="wid_staging_b43f4ac42e8a6a4a7a9f76d7cb5dfe87" // obtain this from developer.worldcoin.org
        signal={addressConnected}
        enableTelemetry
        onSuccess={(verificationResponse) =>
          console.log(verificationResponse)
        } // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>

        <Button variant="contained" onClick={getInfo}>
          Get user info
        </Button>

        <Button
          onClick={() => setShowChat((_showChat) => !_showChat)}
        >
          Show Chat
        </Button>

        <Button
          variant="contained"
          onClick={
            statusConnection === StatusConnection.Connected
              ? logout
              : login
          }
        >
          Connect {statusConnection}
        </Button>

        {showChat && <Chat open={showChat} />}

        <TextEditor />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home
