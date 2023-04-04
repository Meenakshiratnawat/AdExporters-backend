const stripe = require("stripe")("sk_test_51MtE2oSCeyM3hzJW0mHV7zpKRi7xq3Qujm8HWCon3DC552JLyh4EGtpGKbMUt4ihOSO0dHDaAlvps1805noRPXfc003TA0Iz2Y")
const uuid = require("uuid/v4");

//todo: change the above secret key

exports.makepayment = (req,res) => {
    const {products, token} = req.body


    let amount =0
    products.map(p => {
        amount = amount + parseInt(p.price)   
    })
    const idempotencyKey = uuid()


    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: amount*100,
            currency: 'INR',
            customer: customer.id,
            receipt_email: token.email,
            description: "A Test account Description",
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip
                }

            }  
        },{idempotencyKey})
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })

};