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
        console.log('orderline', orderline)
        const product = orderline.product
        console.log('product', product)

        // if (orderline.quantity > product.quantity) {
        //     return res.status(400).send({
        //         message: `Not possible, the orderline quantity is bigger than the stock`
        //     })
        // }
        // else {

        console.log('product.quantity', product.quantity)
        console.log('orderline.quantity', orderline.quantity)

        product.quantity = product.quantity - orderline.quantity

        console.log('total', product.quantity)
        if (product.quantity < 0) {
            product.quantity = 0
        }
        product.save()

        // }
    }
    )
}

module.exports = { totalSum, paymentAmount, adjustStock }
