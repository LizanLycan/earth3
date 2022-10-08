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

  getUserInfo: () => Promise<any>
  login: () => Promise<string>
  logout: () => void
}
