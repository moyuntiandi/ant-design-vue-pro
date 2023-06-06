import { axios } from '@/utils/request'

export function getSystemUsers (parameter) {
  return axios({
    url: '/systemUsers/',
    method: 'get',
    params: parameter
  })
}
