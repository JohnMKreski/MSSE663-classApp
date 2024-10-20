export type PizzaSize = 'small' | 'medium' | 'large' | 'x-large';

export interface Pizza {
    size: PizzaSize;
    toppings: string;
    _id?: string;
}