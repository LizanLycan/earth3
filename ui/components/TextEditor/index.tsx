import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { Box } from '@mui/system'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useWeb3 } from '../../contexts/Web3Context'
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
  const { addressConnected } = useWeb3()
  const { storeFile, retrieveFiles } = useWeb3Storage()
  const [files, setFiles] = useState<any[]>([])

  useEffect(() => {
    if (addressConnected) {
      getFiles()
    }
  }, [addressConnected])

  const onSave = async (value: any) => {
    const cid = await storeFile?.(value, 'x.json')
    const response = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cid,
        address: addressConnected
      })
    })

    const data = await response.json()
    console.log(data)
  }

  const getFiles = async () => {
    const response = await fetch(
      `/api/retrieve?address=${addressConnected}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const data = await response.json()

    setFiles(data)
  }

  const downloadFile = async () => {
    const response = await retrieveFiles?.(
      'bafybeidbqa2o4ohobvnvhjhtkpdc2bijapasmvd6jieojksq4dn7brtyau'
    )

    console.log('RESPONSE: ', response)
  }

  return (
    <Card sx={{ maxWidth: '700px' }}>
      <Button onClick={getFiles}>Retrieve</Button>

      <List>
        {files?.map((file) => (
          <ListItem>
            <ListItemText title={file.drive} primary={file.drive} />
          </ListItem>
        ))}
      </List>
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
