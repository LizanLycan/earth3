import { ethers } from 'ethers'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { StreamrClient } from 'streamr-client'
import { useWeb3 } from '../Web3Context'

interface IStreamingMessages {
  getOrCreateStream: (peer: string) => Promise<any>
  subscribeMessages: (
    peerAddress: string,
    callback: (content: any, metadata: any) => void
  ) => Promise<void>
  publishMessage(stream: any, message: any): Promise<void>
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

const STREAM_BASE_ID = 'project-x'

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

  useEffect(() => {
    if (addressConnected) getConversations()
  }, [addressConnected])

  async function getConversations() {
    try {
      const streams = await streamr
        ?.searchStreams(STREAM_BASE_ID, {
          user: addressConnected as string,
          allowPublic: true
        })
        .next()

      console.log('Streams', streams)
    } catch (err) {
      return
    }
  }

  async function getOrCreateStream(peerAddress: string) {
    const stream = await streamr?.getStream(
      '0x41e36d4ffb5b443b20f55bcff27c68ff086fe06f/my-test-stream'
    )
    // await stream?.addToStorageNode(STREAMR_STORAGE_NODE_GERMANY)

    return stream
  }

  async function subscribeMessages(
    peerAddress: string,
    callback: (content: any, metadata: any) => void
  ) {
    const sub1 = await streamr?.subscribe(
      {
        id: '0x41e36d4ffb5b443b20f55bcff27c68ff086fe06f/my-test-stream',
        resend: {
          last: 10
        }
      },
      callback
    )
  }

  async function publishMessage(stream: any, message: any) {
    await streamr?.publish(
      '0x41e36d4ffb5b443b20f55bcff27c68ff086fe06f/my-test-stream',
      message
    )
  }

  const contextObj = {
    getOrCreateStream,
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
