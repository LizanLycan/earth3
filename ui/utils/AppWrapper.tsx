import Web3ContextProvider from '../contexts/Web3Context'
import Web3StorageContextProvider from '../contexts/Web3Storage'

type AppProps = {
  children?: React.ReactNode
}

function App({ children }: AppProps) {
  return (
    <Web3ContextProvider>
      <Web3StorageContextProvider>
        {children}
      </Web3StorageContextProvider>
    </Web3ContextProvider>
  )
}

export default App
