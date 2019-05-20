function totalSum(orderline) {

    // const orderlineThisOrder = orderlines.filter(
    //     orderlin => { return orderlin.OrderId === order.id })

    // const orderlinePrice = orderlineThisOrder.map(orderline => orderline.price)
    // const orderlineQuantity = orderlineThisOrder.map(orderline => orderline.quantity)

    // console.log('orderlinePrice', orderlinePrice)


    // console.log('orderlineThisOrder', orderlineThisOrder)
    console.log('orderline.price', orderline.price)
    console.log('orderline.quantity', orderline.quantity)
    return orderline.price * orderline.quantity

}

module.exports = totalSum

