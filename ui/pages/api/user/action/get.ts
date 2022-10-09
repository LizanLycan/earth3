// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserAction from '../../../../models/userAction'
import mongoConnection from '../../../../utils/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await mongoConnection()

    const { address, worldId } = req.query

    if (!address || !worldId) {
      res.status(400).json({ error: 'Not address' })
    }

    const worldAction = await UserAction.find({ address, worldId })

    res.status(200).json(worldAction)
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}
