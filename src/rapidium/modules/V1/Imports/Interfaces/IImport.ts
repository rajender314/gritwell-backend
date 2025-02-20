export interface IRecommendation {
    name: string;
    description: string;
    status: boolean;
    uuid?: string;
    brand?: string;
    dosage?: string;
    price?: number;
    type?: number;
    link?: string;
    created_by: string;
    last_modified_by: string;
    created_date: Date;
    last_modified_date: Date;
}

export interface IDBRecommendation {
    [key: string]: { 'id': string }
}


export interface IHypothesis {
    name: string;
    status: boolean;
    uuid?: string;
    created_by: string;
    last_modified_by: string;
    created_date: Date;
    last_modified_date: Date;
}

export interface IDBHypothesis {
    [key: string]: { 'id': string }
}
