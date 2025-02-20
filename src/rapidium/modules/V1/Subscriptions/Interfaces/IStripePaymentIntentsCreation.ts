export interface IStripePaymentIntentsCreation{
    amount: number,
    currency: string,
    customer: string,
    description: string,
    metadata: Object
}
