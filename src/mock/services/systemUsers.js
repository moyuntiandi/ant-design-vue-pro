import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 101

const systemUsers = (options) => {
  // const parameters = JSON.parse(options.body) // getQueryParameters(options)
  const parameters = getQueryParameters(options)
  console.log('parameters', parameters)
  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  console.log('pageNo', pageNo)
  console.log('pageSize', pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
      const tmpKey = key + i
      result.push({
        key: tmpKey,
        id: i + 1,
        userName: 'bush',
        nickName: '张三丰',
        status: 0,
        email: 'moyuntiandi@126.com',
        telNo: 15086625310,
        action: 'test'
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/systemUsers/, 'get', systemUsers)
