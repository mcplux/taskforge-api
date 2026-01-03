import { NextFunction, Request, Response } from 'express'
import { ZodType, z } from 'zod'

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      const flattenedErrors = z.flattenError(parsed.error)
      return res.status(400).json({
        success: false,
        error: flattenedErrors.fieldErrors,
      })
    }

    req.body = parsed.data
    next()
  }
}
