import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '../src/Link'
import ProTip from '../src/ProTip'
import Copyright from '../src/Copyright'
import { Button } from '@mui/material'
import { useWeb3 } from '../contexts/Web3Context'
import { StatusConnection } from '../contexts/Web3Context/types'

const Home: NextPage = () => {
  const { login, logout, statusConnection, getUserInfo } = useWeb3()

  const getInfo = async () => {
    const res = await getUserInfo?.()

    console.log('USER INFOR RESPONSE: ', res)
  }

  return (
    <Container maxWidth="lg">
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
          variant="contained"
          onClick={
            statusConnection === StatusConnection.Connected
              ? logout
              : login
          }
        >
          Connect {statusConnection}
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home
