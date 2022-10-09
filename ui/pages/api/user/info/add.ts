// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import UserInfo from '../../../../models/userInfo'
import mongoConnection from '../../../../utils/mongodb'

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

    const { email, name, profileImage, address } = req.body

    if (!address || !email || !name || !profileImage) {
      res.status(200).json({ error: 'Required fields' })
    }

    const newAction = new UserInfo({
      address,
      email,
      name,
      profileImage
    })

    await newAction.save()

    res.status(200).json({ response: 'Ok' })
  } catch (e) {
    res.status(500).json(e as Error)
  }
}
