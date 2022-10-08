import { ethers } from 'ethers'
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Web3Storage,
  getFilesFromPath,
  CIDString
} from 'web3.storage'
import { WEB_3_STORAGE_API_TOKEN } from '../../utils/constants'

interface IWeb3Storage {
  storeFile: (
    object: any,
    name: string
  ) => Promise<CIDString | undefined>
  retrieveFiles: (cid: string) => Promise<any[]>
}

export const Web3StorageContext = createContext<
  Partial<IWeb3Storage>
>({})

export const useWeb3Storage = () => {
  const context = useContext(Web3StorageContext)
  if (!context) {
    throw new Error(
      '[useWeb3StorageContext] Hook not used under web3 context provider'
    )
  }
  return context
}

const Web3StorageContextProvider = ({
  children
}: PropsWithChildren<unknown>) => {
  const [storageClient, setStorageClient] = useState<Web3Storage>()

  useEffect(() => {
    const storage = new Web3Storage({
      token: WEB_3_STORAGE_API_TOKEN
    })
    setStorageClient(storage)
  }, [])

  const makeFileObject = (object: any, name: string) => {
    const blob = new Blob([JSON.stringify(object)], {
      type: 'application/json'
    })

    const files = [new File([blob], name)]
    return files
  }

  async function storeWithProgress(files: File[]) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid: string) => {
      console.log('uploading files with cid:', cid)
    }

    // when each chunk is stored, update the percentage complete and display
    const totalSize = files
      .map((f) => f.size)
      .reduce((a, b) => a + b, 0)
    let uploaded = 0

    const onStoredChunk = (size: number) => {
      uploaded += size
      const pct = 100 * (uploaded / totalSize)
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }

    // makeStorageClient returns an authorized Web3.Storage client instance
    // const client = makeStorageClient()

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return storageClient?.put(files, {
      onRootCidReady,
      onStoredChunk
    })
  }

  async function storeFile(object: any, name: string) {
    const files = makeFileObject(object, name)

    return storeWithProgress(files)
  }

  async function retrieveFiles(cid: string) {
    const res = await storageClient?.get(cid)
    console.log(`Got a response! [${res?.status}] ${res?.statusText}`)
    if (!res?.ok) {
      throw new Error(`failed to get ${cid}`)
    }

    const response: any[] = []
    // unpack File objects from the response
    const files = await res.files()
    for (const file of files) {
      const json = await file.text()
      response.push(JSON.parse(JSON.parse(json)))
    }

    return response
  }

  const contextObj = {
    storeFile,
    retrieveFiles
  }

  return (
    <Web3StorageContext.Provider value={contextObj}>
      {children}
    </Web3StorageContext.Provider>
  )
}

export default Web3StorageContextProvider
