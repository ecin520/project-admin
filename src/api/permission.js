import request from '../utils/request'

export function listAllAdditionalPermissions() {
  return request({
    url: '/admin/AdditionalPermission/listAllAdditionalPermissions',
    method: 'get'
  })
}

export function listAllPermissions(pageNum, pageSize) {
  return request({
    url: '/admin/Permission/listAllPermissions',
    method: 'get',
    params: {
      pageNum: pageNum,
      pageSize: pageSize
    }
  })
}

export function updateByUserId(permission) {
  return request({
    url: '/admin/Permission/updateByPermissionId',
    method: 'post',
    data: permission
  })
}

export function insertPermission(permission) {
  return request({
    url: '/admin/Permission/insertPermission',
    method: 'post',
    data: permission
  })
}

export function countPermission() {
  return request({
    url: '/admin/Permission/countPermission',
    method: 'get'
  })
}

export function deleteByPermissionId(id) {
  return request({
    url: '/admin/Permission/deleteByPermissionId',
    method: 'get',
    params: {id}
  })
}