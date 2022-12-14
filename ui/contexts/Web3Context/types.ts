import { SafeEventEmitterProvider } from '@web3auth/base'
import { ethers } from 'ethers'

export enum StatusConnection {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Error = 'error'
}

export const ERROR_CODES = {
  NON_CHAIN_NAME: -32602,
  UNRECOGNIZED_CHAIN_ID: -32603
}

export interface IWeb3Context {
  chainId: number
  statusConnection: StatusConnection
  addressConnected: string
  signer: ethers.providers.JsonRpcSigner | ethers.Signer | undefined
  provider: SafeEventEmitterProvider | null
  userInfo: any
  worldId: string

  getUserInfo: () => Promise<any>
  login: () => Promise<string>
  logout: () => void
  verifyLogin: (verifyResponse: any) => void
}
