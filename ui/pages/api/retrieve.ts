// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import AccountInfo from '../../models/accountInfo'
import mongoConnection from '../../utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    console.log('CONNECTING TO MONGO')
    await mongoConnection()
    console.log('CONNECTED TO MONGO')

    const test = await AccountInfo.find()

    res.json(test)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
