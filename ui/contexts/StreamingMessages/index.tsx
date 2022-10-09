import { ethers } from 'ethers'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { StreamrClient } from 'streamr-client'
import { STREAMR_STREAM } from '../../utils/constants'
import { useWeb3 } from '../Web3Context'

interface IStreamingMessages {
  getStream: () => Promise<any>
  subscribeMessages: (
    callback: (content: any, metadata: any) => void
  ) => Promise<void>
  publishMessage(message: any): Promise<void>
}

export const StreamingMessagesContext = createContext<
  Partial<IStreamingMessages>
>({})

export const useStreamingMessages = () => {
  const context = useContext(StreamingMessagesContext)
  if (!context) {
    throw new Error(
      '[useStreamingMessagesContext] Hook not used under web3 context provider'
    )
  }
  return context
}

const StreamingMessagesContextProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const { addressConnected } = useWeb3()
  const [streamr, setStreamr] = useState<StreamrClient>()

  useEffect(() => {
    const _streamr = new StreamrClient({
      auth: {
        ethereum: (window as any).ethereum
      }
    })

    // const _streamr = new StreamrClient()

    setStreamr(_streamr)
  }, [(window as any).ethereum])

  async function getStream() {
    const stream = await streamr?.getStream(STREAMR_STREAM)

    return stream
  }

  async function subscribeMessages(
    callback: (content: any, metadata: any) => void
  ) {
    await streamr?.subscribe(
      {
        id: STREAMR_STREAM,
        resend: {
          last: 50
        }
      },
      callback
    )
  }

  async function publishMessage(message: any) {
    await streamr?.publish(STREAMR_STREAM, message)
  }

  const contextObj = {
    getStream,
    subscribeMessages,
    publishMessage
  }

  return (
    <StreamingMessagesContext.Provider value={contextObj}>
      {children}
    </StreamingMessagesContext.Provider>
  )
}

export default StreamingMessagesContextProvider
