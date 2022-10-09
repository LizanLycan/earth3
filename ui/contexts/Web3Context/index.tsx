import { ethers } from 'ethers'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { Web3Auth } from '@web3auth/web3auth'
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  ADAPTER_EVENTS,
  CONNECTED_EVENT_DATA
} from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { ERROR_CODES, IWeb3Context, StatusConnection } from './types'
import {
  WEB_3_AUTH_ID,
  WORLD_COIN_ACTIONS
} from '../../utils/constants'
import RPC from './ethersRPC'
import { MetamaskAdapter } from '@web3auth/metamask-adapter'
import { WalletConnectV1Adapter } from '@web3auth/wallet-connect-v1-adapter'

const walletConnectV1Adapter = new WalletConnectV1Adapter({
  adapterSettings: {
    bridge: 'https://bridge.walletconnect.org'
  },
  clientId: WEB_3_AUTH_ID
})

const metamaskAdapter = new MetamaskAdapter({
  clientId: WEB_3_AUTH_ID
})

export const Web3Context = createContext<Partial<IWeb3Context>>({})

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error(
      '[useWeb3Context] Hook not used under web3 context provider'
    )
  }
  return context
}

const Web3ContextProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const [chainId, setChainId] = useState<number>(0)
  const [statusConnection, setStatusConnection] =
    useState<StatusConnection>(StatusConnection.Disconnected)
  const [addressConnected, setAddressConnected] = useState<string>('')
  const [signer, setSigner] = useState<
    ethers.providers.JsonRpcSigner | ethers.Signer | undefined
  >()
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null)
  const [provider, setProvider] =
    useState<SafeEventEmitterProvider | null>(null)
  const [userInfo, setUserInfo] = useState<any>()

  const [worldId, setWorldId] = useState<string>()

  useEffect(() => {
    ;(async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: WEB_3_AUTH_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            rpcTarget: 'https://rpc.ankr.com/eth' // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: 'dark',
            loginMethodsOrder: ['facebook', 'google'],
            appLogo: 'https://web3auth.io/images/w3a-L-Favicon-1.svg' // Your App Logo Here
          }
        })

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId: WEB_3_AUTH_ID,
            network: 'testnet',
            uxMode: 'popup',
            whiteLabel: {
              name: 'Project X',
              logoLight:
                'https://web3auth.io/images/w3a-L-Favicon-1.svg',
              logoDark:
                'https://web3auth.io/images/w3a-D-Favicon-1.svg',
              defaultLanguage: 'en',
              dark: true // whether to enable dark mode. defaultValue: false
            },
            loginConfig: {
              // Add login configs corresponding to the providers on modal
              // Google login
              google: {
                name: 'Custom Auth Login',
                verifier: 'google_oauth_verifier',
                typeOfLogin: 'google',
                clientId:
                  '371690983674-sulca0aieepqu5loobdk37sodaru6ec1.apps.googleusercontent.com'
              }
            }
          }
        })

        web3auth.configureAdapter(walletConnectV1Adapter)
        web3auth.configureAdapter(metamaskAdapter)
        web3auth.configureAdapter(openloginAdapter)
        setWeb3auth(web3auth)

        await web3auth.initModal({
          modalConfig: {
            [WALLET_ADAPTERS.OPENLOGIN]: {
              label: 'openlogin',
              loginMethods: {
                reddit: {
                  showOnModal: false,
                  name: 'reddit'
                },
                facebook: {
                  showOnModal: false,
                  name: 'facebook'
                }
              }
            }
          }
        })
        if (web3auth.provider) {
          setProvider(web3auth.provider)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (web3auth) {
      subscribeAuthEvents(web3auth)
      login()
    }
  }, [web3auth])

  useEffect(() => {
    ;(async () => {
      if (
        statusConnection === StatusConnection.Connected &&
        addressConnected
      ) {
        if (addressConnected) {
          const response = await fetch(
            `/api/user/action/get?address=${addressConnected}&worldId=${WORLD_COIN_ACTIONS.login}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )

          const res = await response.json()

          if (!res.length) {
            console.log('WORLDID')
            setWorldId(WORLD_COIN_ACTIONS.login)
          }
        }
      }
    })()
  }, [statusConnection, addressConnected])

  const login = async (): Promise<string> => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      setStatusConnection(StatusConnection.Disconnected)
      return StatusConnection.Disconnected
    }

    try {
      const web3authProvider = await web3auth.connect()
      setProvider(web3authProvider)

      if (web3authProvider) {
        web3authProvider?.on('network', (newNetwork) => {
          setChainId(newNetwork.chainId)
        })

        const rawProvider = new RPC(web3authProvider)
        const chainId = await rawProvider.getChainId()
        const account = await rawProvider.getAccounts()
        const signer = rawProvider.getSigner()

        setStatusConnection(StatusConnection.Connected)
        setAddressConnected(account)

        setSigner(signer)
        setChainId(chainId)

        return StatusConnection.Connected
      }

      setStatusConnection(StatusConnection.Disconnected)
      return StatusConnection.Disconnected
    } catch (err: any) {
      if (
        err.code === ERROR_CODES.NON_CHAIN_NAME ||
        err.code === ERROR_CODES.UNRECOGNIZED_CHAIN_ID
      ) {
      }

      setStatusConnection(StatusConnection.Error)

      return StatusConnection.Error
    }
  }

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
      return
    }
    await web3auth.logout()

    setStatusConnection(StatusConnection.Disconnected)
    setAddressConnected('')
    setSigner(undefined)
    setChainId(0)
    setProvider(null)
    setUserInfo(null)
  }

  // subscribe to lifecycle events emitted by web3auth
  const subscribeAuthEvents = (web3auth: Web3Auth) => {
    web3auth.on(
      ADAPTER_EVENTS.CONNECTED,
      async (data: CONNECTED_EVENT_DATA) => {
        const userInfo = await web3auth.getUserInfo()
        setUserInfo(userInfo)
        setStatusConnection(StatusConnection.Connected)
      }
    )
    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log('connecting')
    })
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log('disconnected')
      setStatusConnection(StatusConnection.Disconnected)
    })
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log('error', error)
      setStatusConnection(StatusConnection.Error)
    })

    web3auth.on(ADAPTER_EVENTS.READY, () => {
      console.log('READYYYYYYY')
    })
  }

  const getUserInfo = async () => {
    if (
      !web3auth ||
      statusConnection !== StatusConnection.Connected
    ) {
      return
    }

    return web3auth.getUserInfo()
  }

  const verifyLogin = async (verificationResponse: any) => {
    const response = await fetch(
      'https://developer.worldcoin.org/api/v1/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...verificationResponse,
          signal: addressConnected,
          action_id: WORLD_COIN_ACTIONS.login
        })
      }
    )

    const successRes = await response.json()

    if (successRes?.success) {
      await fetch('/api/user/action/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address: addressConnected,
          worldId: WORLD_COIN_ACTIONS.login
        })
      })

      setWorldId('')
    }

    return response.ok
  }

  const contextObj = {
    chainId,
    statusConnection,
    addressConnected,
    userInfo,
    worldId,
    signer,
    provider,
    login,
    logout,
    getUserInfo,
    verifyLogin
  }

  return (
    <Web3Context.Provider value={contextObj}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider
