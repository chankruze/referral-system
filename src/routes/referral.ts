/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:43:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import ReferralDAO from '../dao/referralDAO'

const router = express.Router()

/**
 * @route GET /id/:id
 * @param {string} id
 * @returns {ReferralType} referralCode object
 */
router.get('/id/:id', async (req, res) => {
  const { id } = req.params

  const referralCode = await ReferralDAO.getOneReferralCodeById(id)

  if (referralCode) return res.json(referralCode)

  return res.status(404).json({
    message: 'Can not find referralCode'
  })
})

/**
 * @route GET /code/:code
 * @param {string} id
 * @returns {ReferralType} referralCode object
 */
router.get('/code/:code', async (req, res) => {
  const { code } = req.params

  const referralCode = await ReferralDAO.getOneReferralCodeByCode(code)

  if (referralCode) return res.json(referralCode)

  return res.status(404).json({
    message: 'Can not find referralCode'
  })
})

export default router
