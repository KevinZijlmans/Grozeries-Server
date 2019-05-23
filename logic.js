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

    orderlines.map(orderline => {


        const productArray = orderline.map(product => { return product })
        console.log('productarray', productArray)
        productArray.map(product => {
            if (product.id === orderline.productId) {
                // product.quantity = product.quantity - orderline.quantity
                console.log('product.quantity', product.quantity)
            }
        })

    })

    // product.save()
}

module.exports = { totalSum, paymentAmount, adjustStock }
