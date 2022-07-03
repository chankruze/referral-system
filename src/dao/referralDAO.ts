/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Jul 03 2022 12:47:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'mongodb'

let referrals

export default class ReferralDAO {
  static async injectDB (conn) {
    if (referrals) {
      return
    }
    try {
      referrals = await conn.db(process.env.DB_NS).collection('referrals')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  /***************************************************************************
   * CREATE METHODS
   ***************************************************************************/

  /**
   * Inserts a referral code in the `referrals` collection
   * @param {string} referralCode The code
   * @returns {string | null} The inserted id or null
   */
  static async insertOneReferralCode (referralCode: string) {
    try {
      return await referrals.insertOne({
        code: referralCode,
        count: 0
      })
    } catch (e) {
      console.error(
        `Unable to insert referral code into referrals collection: ${e}`
      )
      return null
    }
  }

  /***************************************************************************
   * READ METHODS
   ***************************************************************************/

  /**
   * Inserts a referral code in the `referrals` collection
   * @param {string} referralCode The code
   * @returns {ReferralType | null} The ReferralType or null
   */
  static async getOneReferralCodeById (_id: string) {
    try {
      return await referrals.findOne({ _id: new ObjectId(_id) })
    } catch (e) {
      console.error(`Unable to find referral code by id: ${e}`)
      return null
    }
  }

  /**
   * Inserts a referral code in the `referrals` collection
   * @param {string} referralCode The code
   * @returns {ReferralType | null} The ReferralType or null
   */
  static async getOneReferralCodeByCode (referrerCode: string) {
    try {
      return await referrals.findOne({
        code: referrerCode
      })
    } catch (e) {
      console.error(`Unable to find referral code: ${e}`)
      return null
    }
  }

  /***************************************************************************
   * DELETE METHODS
   ***************************************************************************/

  /**
   * Deletes a referral code in the `referrals` collection
   * @param {string} _id The _id of the referral code
   * @returns {string | null} Returns no. of deleted referral code
   */
  static async deleteOneReferralById (_id: string) {
    try {
      const { deletedCount } = await referrals.deleteOne({
        _id: new ObjectId(_id)
      })

      return deletedCount
    } catch (e) {
      console.error(
        `Unable to delete referral code from the referrals collection: ${e}`
      )
      return null
    }
  }
}
