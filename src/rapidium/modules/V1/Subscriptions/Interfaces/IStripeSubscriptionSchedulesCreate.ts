export interface IStripeSubscriptionSchedulesCreate{
    customer: string,
    priceId: string,
    planDuration:number,
    paymentId: string,
}
