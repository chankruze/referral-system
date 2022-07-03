/*
Author: chankruze (chankruze@gmail.com)
Created: Thu Jun 30 2022 21:24:19 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type UserType = {
  _id?: string
  email: string
  password: string
  referralCodeId: string // _id of a referralCode
  referrerCodeId?: string // _id of the referrer's referralCode
}
