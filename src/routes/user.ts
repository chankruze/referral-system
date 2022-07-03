/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 30 2022 17:07:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'

import UsersDAO from '../dao/usersDAO'
import ReferralDAO from '../dao/referralDAO'

// types
import { UserType } from '../types/user'

const router = express.Router()

/**
 * @route POST /signin
 * @params body { email, password }
 */
router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  // check db for existing user
  const user: UserType | null = await UsersDAO.getOneUserByEmail(email)

  if (!user) {
    return res.status(404).json({
      message: `user with ${email} does not exists`
    })
  }

  const match = bcrypt.compareSync(password, user.password)

  // password matches
  if (match) {
    return res.json({
      message: 'login successful',
      user
    })
  }

  // password don't match
  return res.status(401).json({
    message: 'invalid credentials'
  })
})

/**
 * @route POST /signup
 * @params body { email, password, referrerCode }
 */
router.post('/signup', async (req, res) => {
  const { email, password, referrerCode } = req.body

  // check db if email exists,
  // if exists return error
  const user: UserType = await UsersDAO.getOneUserByEmail(email)

  if (user) {
    return res.status(400).json({
      message: `${email} is already registered`,
      referrer: user.referrerCodeId || null
    })
  }

  // hash the password
  const hashedPass = bcrypt.hashSync(password, 10)
  // generate unique referral code for the account
  const referralCode = nanoid(6)
  // store that refferal code and get the id
  const { insertedId: referralCodeId } =
    await ReferralDAO.insertOneReferralCode(referralCode)
  // find the referrerCode id
  const referrerCodeId = await ReferralDAO.getOneReferralCodeByCode(
    referrerCode
  )

  // register the user with given credentials
  const userId = await UsersDAO.addOneUser(
    email,
    hashedPass,
    referralCodeId,
    referrerCodeId
  )

  // if user is created successfully
  if (userId) {
    return res.json({
      message: `${email} is successfully signed up!`,
      userId,
      referralCodeId,
      referrerCodeId
    })
  }

  return res.status(500).json({
    message: 'Error signing up'
  })
})

/**
 * @route DELETE /:id
 * @params {string} userID
 */
router.delete('/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const { email, password } = req.body

    if (!uid) {
      return res.status(400).json({
        message: '_id not provided'
      })
    }

    const user: UserType = await UsersDAO.getOneUserById(uid)
    const referralCode = user.referralCodeId

    if (!email || email !== user.email) {
      return res.status(400).json({
        message: 'invalid email or email not provided'
      })
    }

    const match = bcrypt.compareSync(password, user.password)

    if (!password || !match) {
      return res.status(400).json({
        message: 'invalid password or password not provided'
      })
    }

    const userDelCount = await UsersDAO.deleteOneUser(uid)
    // if user is deleted, delete his/her referralCode also
    const referralCodeDelCount = await ReferralDAO.deleteOneReferralById(
      referralCode
    )

    if (userDelCount && referralCodeDelCount) {
      return res.json({
        message:
          'User and referralCode associated with that account has been deleted successfully'
      })
    }

    if (userDelCount) {
      return res.json({
        message: 'User has been deleted successfully'
      })
    }

    return res.status(500).json({
      message: 'User deletion unsuccessful'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error deleting the user'
    })
  }
})

export default router
