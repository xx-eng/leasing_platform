import { post } from '@/api/api'
const baseUrl = '/user'

export function getAllSchoolGoods() {
  return post(baseUrl + '/getAllSchoolGoods', {})
}

export function getUserSchoolGoods(userId) {
  return post(baseUrl + '/getUserSchoolGoods', {userId})
}

export function getUserUnpayOrder(userId) {
  return post(baseUrl + '/getUserUnpayOrder', {userId})
}

export function getUserReturnOrder(userId) {
  return post(baseUrl + '/getUserReturnOrder', {userId})
}

export function addUserGoods(goods) {
  return post(baseUrl + '/addUserGoods', goods)
}

export function deleteUserGoods(id) {
  return post(baseUrl + '/deleteUserGoods', {id})
}

export function get(id) {
  return post(baseUrl + '/get', {id})
}

export function addSchoolOrder(userId, goodsId, rentTime, rental) {
  return post(baseUrl + '/addSchoolOrder', {userId, goodsId, rentTime, rental})
}

export function schoolPay(id) {
  return post(baseUrl + '/schoolPay', {id})
}

