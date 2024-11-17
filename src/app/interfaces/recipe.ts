export interface Recipe {
    id?: string;
    title: string;
    category: string;
    instructions: string;
    image: string;
    favourite?: boolean;
}
