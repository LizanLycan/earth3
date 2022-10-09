import { Schema, model, models } from 'mongoose'

export interface IUserInfo {
  address: string
  email?: string
  name?: string
  profileImage?: string
}

const UserInfoSchema = new Schema<IUserInfo>({
  address: {
    type: String,
    required: true
  },
  email: String,
  name: String,
  profileImage: String
})

const UserInfo = models.UserInfo || model('UserInfo', UserInfoSchema)

export default UserInfo
