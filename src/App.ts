/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
// routes
import rootRoutes from './routes'

class App {
  public app

  constructor () {
    this.app = express()
    this.useMiddlewares()
    this.mountRoutes()
  }

  private useMiddlewares (): void {
    this.app.use(
      helmet(),
      cors(),
      morgan('dev'),
      express.json(),
      express.urlencoded({ extended: false })
    )
  }

  private mountRoutes (): void {
    // mount routes
    this.app.use('/', rootRoutes)
  }
}

export default new App().app
