import { Modal } from '@mui/material'
import { WorldIDWidget } from '@worldcoin/id'
import { useWeb3 } from '../contexts/Web3Context'

interface IWorldCoinWidgetProps {
  verifierCallback: (verifierResponse: any) => void
}

const WorldCoinWidget = (props: IWorldCoinWidgetProps) => {
  const { worldId, addressConnected } = useWeb3()

  return worldId && addressConnected ? (
    <Modal open={!!worldId && !!addressConnected}>
      <WorldIDWidget
        actionId={worldId} // obtain this from developer.worldcoin.org
        signal={addressConnected}
        enableTelemetry
        onSuccess={props.verifierCallback} // you'll actually want to pass the proof to the API or your smart contract
        onError={(error) => console.error(error)}
      />
    </Modal>
  ) : null
}

export default WorldCoinWidget
