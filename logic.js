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
    //gives an array of orderlines with products
    orderlines.map(orderline => {

        const product = orderline.product
        product.quantity = product.quantity - orderline.quantity
        product.save()
    })


}

module.exports = { totalSum, paymentAmount, adjustStock }
