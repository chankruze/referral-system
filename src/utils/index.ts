/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 19:05:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import os from 'os'

export const getNetWorkUrl = () => {
  const networkInterfaces = os.networkInterfaces()

  const validInterfaceKeys = Object.keys(networkInterfaces).filter(
    (nic) => !nic.toLowerCase().includes('lo')
  )

  const validInterfaces = Object.values(
    networkInterfaces[validInterfaceKeys[0]]
  ).filter(
    (alias) =>
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
  )

  return validInterfaces[0].address || '0.0.0.0'
}

export const isDevEnv = () => process.env.NODE_ENV === 'development'

export const banner = (port) => {
  console.log('├───────────────────────────┤')
  console.log('├ 🚀 server is listening on ┤')
  console.log('├───────────────────────────┤')

  if (isDevEnv()) console.log(`└── <localhost>\thttp://localhost:${port}`)

  return console.log(`└── <network>\thttp://${getNetWorkUrl()}:${port}`)
}
