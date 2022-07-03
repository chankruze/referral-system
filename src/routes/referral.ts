/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:43:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import { nanoid } from 'nanoid'

const router = express.Router()

router.post('/generate', (req, res) => {
  // const { user } = req.body
  const referralCode = nanoid(6)

  res.json({
    user: 'email@domain.org',
    referralCode
  })
})

export default router
