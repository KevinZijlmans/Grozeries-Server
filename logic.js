function totalSum(orderline) {

    return orderline.price * orderline.quantity

}

function paymentAmount(order, orderlines) {

    const orderlinePriceArray = orderlines
        .filter(orderline => { return orderline.orderId === order.id })
        .map(orderline => { return orderline.total_price })

    const sum = orderlinePriceArray.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);

    return sum
}

function adjustStock(orderlines) {
    //gives an aray of orderlines with products
    orderlines.map(orderline => {
        console.log('orderline that belongs to this order', orderline)
        console.log('orderline product', orderline.product)
        const product = orderline.product
        console.log('product.quantity before', product.quantity)
        console.log('product.quantity', product.quantity)
        console.log('orderline.quantity', orderline.quantity)

        product.quantity = product.quantity - orderline.quantity
        console.log('product.quantity after', product.quantity)

    })

    // product.save()
}

module.exports = { totalSum, paymentAmount, adjustStock }
