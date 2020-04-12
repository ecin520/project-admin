import request from '../utils/request'

export function listAllRolesById(id) {
  return request({
    url: '/admin/listAllRoles',
    method: 'post',
    params: {id}
  })
}

export function listAllAddPermissionsById(id) {
  return request({
    url: '/admin/listUserAddPermissions',
    method: 'post',
    params: {id}
  })
}