/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Jun 28 2022 20:10:54 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { ObjectId } from 'mongodb'

let users

export default class UsersDAO {
  static async injectDB (conn) {
    if (users) {
      return
    }
    try {
      users = await conn.db(process.env.DB_NS).collection('users')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  /***************************************************************************
   * READ METHODS
   ***************************************************************************/

  /**
   * Finds a user in the `users` collection
   * @param {string} _id The email of the desired user
   * @returns {UserType | null} Returns either a single user or nothing
   */
  static async getOneUserById (_id: string) {
    try {
      return await users.findOne({ _id: new ObjectId(_id) })
    } catch (e) {
      console.error(`Unable to retrieve user from users collection: ${e}`)
      return null
    }
  }

  /**
   * Finds a user in the `users` collection
   * @param {string} email The email of the desired user
   * @returns {UserType | null} Returns either a single user or nothing
   */
  static async getOneUserByEmail (email: string) {
    // Retrieve the user document corresponding with the user's email.
    try {
      return await users.findOne({ email })
    } catch (e) {
      console.error(`Unable to retrieve user from users collection: ${e}`)
      return null
    }
  }

  /***************************************************************************
   * CREATE METHODS
   ***************************************************************************/

  /**
   * Inserts a user in the `users` collection
   * @param {string} email The email of the desired user
   * @param {string} password The password of the desired user
   * @param {string | null} referralCode The referral code of the desired user
   * @param {string | null} referrer The referral code of the referrer
   * @returns {string | null} Returns _id of the inserted user
   */
  static async addOneUser (
    email: string,
    password: string,
    referralCodeId: string,
    referrerCodeId?: string
  ) {
    try {
      const { insertedId } = await users.insertOne({
        email,
        password,
        referralCodeId,
        referrerCodeId
      })

      return insertedId
    } catch (e) {
      console.error(`Unable to add user to the users collection: ${e}`)
      return null
    }
  }

  /***************************************************************************
   * DELETE METHODS
   ***************************************************************************/

  /**
   * Deletes a user in the `users` collection
   * @param {string} _id The _id of the user
   * @returns {number | null} Returns deleted count
   */
  static async deleteOneUser (_id: string) {
    try {
      const { deletedCount } = await users.deleteOne({
        _id: new ObjectId(_id)
      })

      return deletedCount
    } catch (e) {
      console.error(`Unable to delete user from the users collection: ${e}`)
      return null
    }
  }
}
