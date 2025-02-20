export interface INutrition {
    name: string;
    description: string;
    status: string;
    uuid: string;
}

export interface ILifeStyle {
    name: string;
    description: string;
    status: string;
    uuid: string;
}

export interface ISupplement {
    name: string;
    description: string;
    brand: string;
    dosage: string;
    price: number;
    link: string;
    status: string;
    uuid: string;
}

export interface ITest {
    name: string;
    description: string;
    brand: string;
    price: number;
    type: string;
    link: string;
    status: string;
    uuid: string;
}

export interface IHypothesis {
    name: string; 
    status: string; 
    uuid: string;
}

export interface IGoal {
    name: string; 
    status: string; 
    uuid: string;
}
