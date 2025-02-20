export interface IHypothesis {
    id: string;
    name: string; 
    status: boolean; 
}

export interface IHypothesisResponseData {
    paginated_results: Array<IHypothesis>;
    total_count: number
}
