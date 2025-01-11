const razorpay = require("../config/razorpayClient.js");
const orderService = require("../services/order.service.js")

const createPaymentLink = async(orderId) =>{
    try{
        const order = await orderService.findOrderById(orderId);
        const paymentLinkRequest = {
            // in paise
            amount: order.totalPrice*100,
            currency:"INR",
            customer:{
                name:order.user.firstName + " " + order.user.lastName,
                contact: order.user.mobile,
                email:order.user.email
            },
            notify:{
                sms:true,
                email:true
            },
            reminder_enable:true,
            callback_url:`http://localhost:3000/payment/${orderID}`,
            callback_method:'get'
        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData= {
            paymentLinkId,
            payment_link_url
        }

        return resData;
    }catch(error){
        throw new Error(error.message);
    }
}