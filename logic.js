function totalSum(orderlines, order) {


    const orderlineThisOrder = orderlines.filter(
        orderlin => { return orderlin.OrderId === order.id })

    const orderlinePrice = orderlineThisOrder.map(orderline => orderline.price)
    const orderlineQuantity = orderlineThisOrder.map(orderline => orderline.quantity)

    console.log('orderlinePrice', orderlinePrice)


    console.log('orderlineThisOrder', orderlineThisOrder)

    return orderlines.price * orderlines.quantity

}

module.exports = totalSum

