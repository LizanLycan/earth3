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
  messages: any[]
  getStream: () => Promise<any>
  subscribeMessages: () => Promise<void>
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
  const [streamr, setStreamr] = useState<StreamrClient>()
  const [messages, setMessages] = useState<any[]>([])
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    console.log('Messages')
    console.log(messages)
  }, [messages])

  useEffect(() => {
    const _streamr = new StreamrClient({
      auth: {
        ethereum: (window as any).ethereum
      }
    })

    setStreamr(_streamr)
  }, [(window as any).ethereum])

  async function getStream() {
    const stream = await streamr?.getStream(STREAMR_STREAM)

    return stream
  }

  async function subscribeMessages() {
    if (!isSubscribed) {
      setIsSubscribed(true)
      const sus = await streamr?.subscribe(
        {
          id: STREAMR_STREAM,
          resend: {
            last: 50
          }
        },
        (_content: any, metadata: any) => {
          console.log('IS Comming: ', metadata)

          setMessages((_messages) => {
            const newMessages = [
              ..._messages,
              {
                primary: metadata.parsedContent.message,
                sender: metadata.messageId.publisherId,
                secondary: new Date(
                  metadata.messageId.timestamp
                ).toDateString(),
                isSender: true
              }
            ]

            return newMessages
          })
        }
      )

      sus?.onResent(() => {
        console.log(
          'Received all requested historical messages! Now switching to real time!'
        )
      })
    }
  }

  async function publishMessage(message: string) {
    await streamr?.publish(STREAMR_STREAM, { message })
  }

  const contextObj = {
    messages,
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
