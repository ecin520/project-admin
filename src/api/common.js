import request from '../utils/request'

export function createImageCode() {
  return request({
    url: '/common/createImageCode',
    method: 'get'
  })
}