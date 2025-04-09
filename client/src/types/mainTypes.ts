export enum ProductPageType {
    Products,
    Department,
    Brand,
    Search
}

export type ProductPageNavData = {
    pageType: ProductPageType,
    brandOrDepartmentName: string,
    searchQuery: string
}