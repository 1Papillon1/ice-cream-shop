export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    src: string;
}

export async function getProducts(): Promise<Product[]> {
    const results = await fetch("http://localhost:3001/icecreams");
    const products = results.json();
    return products;
}

export type CartItems = { [productID: string]: number};
export type CheckoutResponse = { success: boolean; error?: string};