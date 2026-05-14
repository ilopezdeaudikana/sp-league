import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const validateToken = (req: Request, res: Response, next: NextFunction) => {

  // 1. Grab the token from the Header
  const authHeader = req?.headers.authorization
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  // 2. Grab the token from the Cookie (Optional, but good for cross-referencing)
  const cookieToken = req?.cookies?.['access_token']

  console.log('Running at all!', bearerToken)

  // CSRF PROTECTION LOGIC:
  // If the request is a state-changing action (POST/PUT/DELETE), 
  // we REQUIRE the bearer token in the header.
  if (!bearerToken) {
    console.log('WHAT TEH HELL')
    return res?.status(401).json({ error: "Missing Authorization Header (CSRF Protection)" })
  }

  try {
    // 3. Verify the token signature
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string)

    // 4. (Optional) Extra Safety: Ensure header token matches cookie token
    if (cookieToken && bearerToken !== cookieToken) {
      return res.status(403).json({ error: "Token mismatch" })
    }

    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" })
  }
}