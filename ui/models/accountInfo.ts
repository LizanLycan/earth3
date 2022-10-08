import { Schema, model, models } from 'mongoose'

export interface IAccountInfo {
  address: string
  storageDrives: string[]
}

const accountInfoSchema = new Schema<IAccountInfo>({
  address: {
    type: String,
    required: true,
    unique: true
  },
  storageDrives: [String]
})

const AccountInfo =
  models.AccountInfo || model('AccountInfo', accountInfoSchema)

export default AccountInfo
