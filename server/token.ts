import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const validateToken = (req: Request, _: Response) => {
  let decoded
  const errMessage = 'Invalid Token'
  const authHeader = req?.headers.authorization
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  const cookieToken = req?.cookies?.['access_token']

  if (!bearerToken) {
    console.log('Missing Authorization Header')
    throw new Error(errMessage)
  }

  try {
    decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string)
  } catch (err) {
    throw new Error(errMessage)
  }
  
  if (decoded.sub !== process.env.APP_USER) {
    console.log('User mismatch', decoded, process.env.APP_USER)
    throw new Error(errMessage)
  }

  if (cookieToken && bearerToken !== cookieToken) {
    console.log('Token mismatch', bearerToken, cookieToken)
    throw new Error(errMessage)
  }

}