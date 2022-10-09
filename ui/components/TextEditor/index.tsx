import { Download, PhotoAlbum } from '@mui/icons-material'
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
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
      text: 'Welcome to the party here in the earth3 community!!! ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: '28vja',
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
        {
          offset: 0,
          length: 14,
          style: 'HIGHLIGHT'
        },
        {
          offset: 0,
          length: 14,
          style: 'BOLD'
        }
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
  const [inEdit, setInEdit] = useState()

  useEffect(() => {
    if (addressConnected) {
      getFiles()
    }
  }, [addressConnected])

  const onSave = async (value: any) => {
    const cid = await storeFile?.(value, 'x.json')
    const response = await fetch('/api/file/save', {
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

    await getFiles()
  }

  const getFiles = async () => {
    const response = await fetch(
      `/api/file/retrieve?address=${addressConnected}`,
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

  const downloadFile = async (cid: string) => {
    const response = await retrieveFiles?.(cid)

    setInEdit(response?.[0])
  }

  const truncateCid = (cid: string) => {
    return `${cid.substring(0, 4)}...${cid.substring(
      cid.length - 4,
      cid.length
    )}`
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        {files.length ? (
          <List>
            {files?.map((file) => (
              <ListItem>
                <ListItemButton
                  onClick={() => downloadFile(file.cid)}
                >
                  <ListItemIcon>
                    <PhotoAlbum />
                  </ListItemIcon>
                  <ListItemText
                    title={file.cid}
                    primary={`(New file)`}
                    secondary={truncateCid(file.cid)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box mt={2}>
            <Typography variant="subtitle2">
              There is not files saved yet
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} md={9}>
        <Card sx={{ maxWidth: '700px' }}>
          <Box m={2} mb={8} maxWidth={'100%'}>
            <MUIRichTextEditor
              label="Start typing..."
              onSave={onSave}
              defaultValue={JSON.stringify(inEdit || defaultValue)}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default TextEditor
