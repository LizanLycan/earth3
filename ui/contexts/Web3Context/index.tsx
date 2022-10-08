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
  SafeEventEmitterProvider
} from '@web3auth/base'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import {
  ERROR_CODES,
  IWeb3Context,
  StatusConnection
} from './types.d'
import { WEB_3_AUTH_ID } from '../../utils/constants'
import RPC from './ethersRPC'

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

  useEffect(() => {
    ;(async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: WEB_3_AUTH_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x4',
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
              // Facebook login
              // facebook: {
              //   name: 'Custom Auth Login',
              //   verifier: 'YOUR_FACEBOOK_VERIFIER_NAME', // Please create a verifier on the developer dashboard and pass the name here
              //   typeOfLogin: 'facebook', // Pass on the login provider of the verifier you've created
              //   clientId: 'FACEBOOK_CLIENT_ID_1234567890' // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
              // }
              // Add other login providers here
            }
          }
        })
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

  const login = async (): Promise<string> => {
    if (!web3auth) {
      console.log('web3auth not initialized yet')
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

        subscribeEvents(rawProvider)
        return StatusConnection.Connected
      }

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
  }

  const subscribeEvents = (_provider: any) => {
    if (!_provider.on) return

    _provider.on('disconnect', async () => {
      await logout()
    })

    _provider.on('accountsChanged', async (accounts: string[]) => {
      if (accounts.length > 0) {
        setAddressConnected(accounts[0])
      } else {
        await logout()
      }
    })

    _provider.on('chainChanged', async (networkId: string) => {
      //networkId comes in Hex
      setChainId(parseInt(networkId, 16))
    })
  }

  const contextObj = {
    chainId,
    statusConnection,
    addressConnected,
    login,
    logout
  }

  return (
    <Web3Context.Provider value={contextObj}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider
