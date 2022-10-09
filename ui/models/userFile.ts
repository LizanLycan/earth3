import { Schema, model, models } from 'mongoose'

export interface IUserFile {
  address: string
  cid?: string
}

const UserFileSchema = new Schema<IUserFile>({
  address: {
    type: String,
    required: true
  },
  cid: String
})

const UserFile = models.UserFile || model('UserFile', UserFileSchema)

export default UserFile
