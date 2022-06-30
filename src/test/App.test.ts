/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:30 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from 'axios'

// eslint-disable-next-line no-undef
describe('App', () => {
  // eslint-disable-next-line no-undef
  it('server / should return 200', async () => {
    const response = await axios.get('http://localhost:6767/')
    // eslint-disable-next-line no-undef
    expect(response.status).toBe(200)
  })
})
