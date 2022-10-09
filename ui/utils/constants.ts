const WEB_3_AUTH_ID = process.env.NEXT_PUBLIC_WEB_3_AUTH_ID || ''
const OAUTH_ID = process.env.NEXT_PUBLIC_OAUTH_ID || ''
const WEB_3_STORAGE_API_TOKEN =
  process.env.NEXT_PUBLIC_WEB_3_STORAGE_API_TOKEN || ''
const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI || ''

const WORLD_COIN_ACTIONS = {
  login: 'wid_staging_91be70a0831bb52a07bf99f1d61a0d9d',
  'community-stream': 'wid_staging_f59d8e17c0a729290f174b33b95818c8',
  'build-files': 'wid_staging_633f05bb5692c6270422146a106507ad'
}

const STREAMR_STREAM =
  '0xd0e9d7b0845a74f786153694b4605d6037fb4c0d/earth3'

export {
  WEB_3_AUTH_ID,
  OAUTH_ID,
  WEB_3_STORAGE_API_TOKEN,
  MONGO_URI,
  WORLD_COIN_ACTIONS,
  STREAMR_STREAM
}
