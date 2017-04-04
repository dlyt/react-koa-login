import * as test from './controller'

export const baseUrl = '/test'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      test.getChapters
    ]
  },
  {
    method: 'GET',
    route: '/img',
    handlers: [
      test.getImgs
    ]
  },
]
