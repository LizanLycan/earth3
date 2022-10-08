import { Button, Card } from '@mui/material'
import { Box } from '@mui/system'
import dynamic from 'next/dynamic'
import { useWeb3Storage } from '../../contexts/Web3Storage'
const MUIRichTextEditor = dynamic(() => import('mui-rte'), {
  ssr: false
})

const defaultValue = {
  blocks: [
    {
      key: '71dmu',
      text: 'Welcome to the party!!! Youou',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        { offset: 24, length: 5, style: 'HIGHLIGHT' }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: '8ss4m',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: 'fc6ml',
      text: 'Lizandro Zerpa',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        { offset: 0, length: 14, style: 'HIGHLIGHT' },
        { offset: 0, length: 14, style: 'BOLD' }
      ],
      entityRanges: [],
      data: {}
    },
    {
      key: 'af5to',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
}

const TextEditor = () => {
  const { storeFile, retrieveFiles } = useWeb3Storage()

  const onSave = async (value: any) => {
    await storeFile?.(value, 'x.json')
  }

  const downloadFile = async () => {
    const response = await retrieveFiles?.(
      'bafybeidbqa2o4ohobvnvhjhtkpdc2bijapasmvd6jieojksq4dn7brtyau'
    )

    console.log('RESPONSE: ', response)
  }

  return (
    <Card sx={{ maxWidth: '700px' }}>
      <Button onClick={downloadFile}>Retrieve</Button>
      <Box m={2} mb={8} maxWidth={'100%'}>
        <MUIRichTextEditor
          label="Start typing..."
          onSave={onSave}
          defaultValue={JSON.stringify(defaultValue)}
        />
      </Box>
    </Card>
  )
}

export default TextEditor
