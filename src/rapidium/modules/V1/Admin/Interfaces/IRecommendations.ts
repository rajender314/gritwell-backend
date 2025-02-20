export interface IRecommendation {
    id: string;
    name: string;
    description: boolean;
    uuid: string;
    brand?: string;
    dosage?: string;
    price?: number;
    price_with_symbol?: string;
    type?: number;
    link?: string;
}

export interface IRecommendatationResponseData {
    paginated_results: Array<IRecommendation>;
    total_count: number
}
