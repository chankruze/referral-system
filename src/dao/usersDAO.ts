/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Jun 28 2022 20:10:54 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

// let users

// export default class UsersDAO {
//   static async injectDB (conn) {
//     if (users) {
//       return
//     }
//     try {
//       users = await conn.db(process.env.DB_NS).collection('users')
//     } catch (e) {
//       console.error(`Unable to establish collection handles in userDAO: ${e}`)
//     }
//   }

//   /***************************************************************************
//    * CRUD METHODS
//    ***************************************************************************/

//   /**
//    * Finds a user in the `users` collection
//    * @param {string} email - The email of the desired user
//    * @returns {User | null} Returns either a single user or nothing
//    */
//   static async getOneUser (email: string) {
//     // Retrieve the user document corresponding with the user's email.
//     try {
//       return await users.findOne({ email })
//     } catch (e) {
//       console.error(`Unable to retrieve user from users collection: ${e}`)
//       return null
//     }
//   }
// }
