export type ProductType = {
    id: number,
    name: string,
    department: string,
    brandID: string,
    brand: string,
    img: string,
    price: number,
    discountPrice: number | null,
    reviewCount: number,
    rating: number,
    hiddenByFilter: boolean,
}

export enum ProductSortType {
    Recommened, //This is also the 'reset' option
    Rating,
    LowHigh,
    HighLow,
    AZ,
    ZA
}

export type ProductFilterSetArguments = {
    name: string,
    args: string[]
}

export type OrderType = {
    product: ProductType,
    qty: number
}