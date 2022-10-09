import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip
} from '@mui/material'
import { useWeb3 } from '../contexts/Web3Context'
import { StatusConnection } from '../contexts/Web3Context/types'
import WorldCoinWidget from './WorldCoinWidget'

interface ICustomAppBar {
  drawerWidth: number
}

const CustomAppBar = (props: ICustomAppBar) => {
  const { drawerWidth } = props
  const { userInfo, statusConnection, logout, verifyLogin, login } =
    useWeb3()

  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <WorldCoinWidget verifierCallback={verifyLogin!} />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' }
            }}
          ></Box>
          <Box sx={{ flexGrow: 0, marginRight: 4 }}>
            <Button
              onClick={
                statusConnection === StatusConnection.Connected
                  ? logout
                  : login
              }
              variant={'outlined'}
              sx={{ borderRadius: 12 }}
            >
              {statusConnection === StatusConnection.Connected
                ? 'Disconnect'
                : 'Connect'}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={userInfo?.profileImage || ''}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CustomAppBar
