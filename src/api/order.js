import { post } from '@/api/api'
const baseUrl = '/user'

export function getAllOrders(userId, pageNumber, pageSize, type) {
    return post(baseUrl + '/getAllOrders',{userId, pageNumber, pageSize, type})
}

export function getUnpayOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getUnpayOrders', {userId, pageNumber, pageSize, type})
}

export function getShippedOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getShippedOrders', {userId, pageNumber, pageSize, type})
}

export function getDispatchedOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getDispatchedOrders', {userId, pageNumber, pageSize, type})
}

export function getNotReturnOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getNotReturnOrders', {userId, pageNumber, pageSize, type})
}

export function getCompleteOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getCompleteOrders', {userId, pageNumber, pageSize, type})
}

export function confirm(id){
    return post(baseUrl + '/confirm', {id})
}

export function getOrderInfo(id) {
    return post(baseUrl + '/getOrderInfo', {id})
}

export function continueOrder(id,reletTime, rental){
    return post(baseUrl + '/continueOrder', {id,reletTime, rental})
}

export function terminalOrder(id, logisticsId){
    return post(baseUrl + '/terminalOrder', {id, logisticsId})
}

export function normalTerminalOrder(id, logisticsId){
    return post(baseUrl + '/normalTerminalOrder', {id, logisticsId})
}

export function  addComment(userId, goodsId, goodsComment, mark, orderId){
    return post(baseUrl + '/addComment', {userId, goodsId, goodsComment, mark, orderId})
}

export function getTerminalOrder(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getTerminalOrder', {userId, pageNumber, pageSize, type})
}

export function getUselessOrders(userId, pageNumber, pageSize, type){
    return post(baseUrl + '/getUselessOrders', {userId, pageNumber, pageSize, type})
}

export function buy(id){
    return post(baseUrl + '/buy', {id})
}