// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserFile from '../../../models/userFile'
import mongoConnection from '../../../utils/mongodb'

type Data = {
  response: string
}

type Error = {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Error | Data>
) {
  try {
    await mongoConnection()

    const { cid, address } = req.body

    if (!cid || !address) {
      res.status(200).json({ error: 'Required fields' })
    }

    const newAccount = new UserFile({ address, cid })

    await newAccount.save()

    res.status(200).json({ response: 'Ok' })
  } catch (e) {
    res.status(500).json(e as Error)
  }
}
