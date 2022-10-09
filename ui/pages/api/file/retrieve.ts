// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserFile from '../../../models/userFile'
import mongoConnection from '../../../utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await mongoConnection()

    const { address } = req.query

    if (!address) {
      res.status(400).json({ error: 'Not address' })
    }

    const accountInfos = await UserFile.find({ address })

    res.json(accountInfos)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
