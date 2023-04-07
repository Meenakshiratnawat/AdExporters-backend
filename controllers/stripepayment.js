const stripe = require("stripe")("sk_test_51MtE2oSCeyM3hzJWHurV3NiY5aDERmNwfutGlfSi43IWdeJT8Y2x6pm1fJfVoaDhgxa58dpAdRgyh9JvDvPJVVFU00WddRTHF6")
const uuid = require("uuid/v4");

exports.makepayment = async(req,res) => {
    const {products, token} = req.body


    let amount =0
    products.map(p => {
        amount = amount + parseInt(p.price)   
    })
    let product_detail =""
    products.map(p => {
        product_detail = product_detail + ", " + p.name
    })
    const idempotencyKey = uuid()
    
    const result = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['IN']},
        line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Total Amount',
                },
                unit_amount: amount*100,
              },
              quantity: 1,
            },
          ],
          phone_number_collection: {
            enabled: true,
          },
        mode: 'payment',
        invoice_creation: {
            enabled: true},
        success_url: "http://www.adexporters.com/user/dashboard",
        cancel_url: "http://www.adexporters.com/cart",
        metadata: {
            "products purchased": product_detail
        }
    //}).then(result => console.log(result.url))
     })
   console.log(result.url)
     res.json({url: result.url})
    
    
    //   res.redirect(303, session.url);

    // return stripe.customers.create({
    //     email: token.email,
    //     source: token.id

    // }).then(customer => {
    //     stripe.checkout.sessions.create({
    //         // amount_total: amount,
    //         // currency: 'INR',
    //         // customer: customer.id,
    //         // customer_details: {
    //         //     name: token.card.name,
    //         //     email: token.email,
    //         //     address: token.card.address_line1+", "+token.card.address_line2+", "+token.card.address_city+", "+token.card.address_country+", "+token.card.address_zip,
    //         //     // {
    //         //     //     line1: token.card.address_line1,
    //         //     //     line2: token.card.address_line2,
    //         //     //     city: token.card.address_city,
    //         //     //     country: token.card.address_country,
    //         //     //     postal_code: token.card.address_zip
    //         //     // }

    //         // },
    //         // metadata: {
    //         //     productInfo: product_detail  
    //         // }
    //         line_items: [
    //             {
    //               // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //               price: amount,
    //               quantity: 1,
    //             }
    //           ],
    //           mode: 'payment',
    //           success_url: `${YOUR_DOMAIN}?success=true`,
    //           cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    //     },{idempotencyKey})
    //     .then(result => res.status(200).json(result))
    //     .catch(err => console.log(err));
    // })

};