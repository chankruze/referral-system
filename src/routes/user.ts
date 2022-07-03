/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 30 2022 17:07:56 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import { nanoid } from 'nanoid'
import UsersDAO from '../dao/usersDAO'
import { UserType } from '../types/user'
// import axios from 'axios'

const router = express.Router()

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  // check db for existing user
  const user = await UsersDAO.getOneUserWithPassword(email, password)

  if (user) {
    return res.json({
      message: 'login successful',
      user
    })
  }

  return res.status(401).json({
    message: 'invalid credentials'
  })
})

router.post('/signup', async (req, res) => {
  const { email, password, referrer } = req.body

  // check db if email exists,
  // if exists return error
  const user: UserType = await UsersDAO.getOneUser(email)

  if (user) {
    return res.status(400).json({
      message: `${email} is already registered`,
      referrer: user.referrer
    })
  }

  // generate unique referral code for the account
  const referralCode = nanoid(6)

  // register the user with give credentials
  const insertedId = await UsersDAO.addOneUser(
    email,
    password,
    referralCode,
    referrer
  )

  // if user is created
  if (insertedId) {
    return res.json({
      message: `${email} is successfully signed up!`,
      userId: insertedId,
      referrer,
      referralCode
    })
  }

  return res.status(500).json({
    message: 'Error signing up'
  })
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { email, password } = req.body

    if (!id) {
      return res.status(400).json({
        message: '_id not provided'
      })
    }

    if (!email) {
      return res.status(400).json({
        message: 'email not provided'
      })
    }

    if (!password) {
      return res.status(400).json({
        message: 'password not provided'
      })
    }

    const deletedCount = await UsersDAO.deleteOneUser(id)

    if (deletedCount) {
      return res.json({
        message: 'User deleted successfully'
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
