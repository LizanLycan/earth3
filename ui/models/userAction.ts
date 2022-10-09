import { Schema, model, models } from 'mongoose'

export interface IUserAction {
  address: string
  worldId?: string
}

const UserActionSchema = new Schema<IUserAction>({
  address: {
    type: String,
    required: true
  },
  worldId: String
})

const UserAction =
  models.UserAction || model('UserAction', UserActionSchema)

export default UserAction
