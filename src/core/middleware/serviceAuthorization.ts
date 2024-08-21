import { Request, Response, NextFunction } from 'express'

export const serviceAutorization = (req: Request, res: Response, next: NextFunction) => {
  const API_KEY = process.env.SERVICE_AUTH_TOKEN ?? null;

  if (!API_KEY) {
    console.error('[ServiceAuthorization] API_KEY is not set');

    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }

  const authHeader = req.headers['mvnd_auth'] ?? null;

  console.log(req.headers)

  if (authHeader && authHeader === API_KEY) {
    return next()
  }

  return res.status(401).json({
    message: 'Unauthorized'
  })
}