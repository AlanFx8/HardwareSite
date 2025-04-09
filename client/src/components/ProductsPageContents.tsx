import React, { SyntheticEvent } from 'react'
import { ProductPageNavData } from "../types/mainTypes"
import { ProductType, ProductFilterSetArguments } from "../types/productTypes"
import ProductPageHeader from "./ProductPageHeader"
import ProductPageFilters from "./ProductPageFilters"
import ListedProduct from "./ListedProduct"
import "../styles/products-page.scss"

interface ProductsPageContentsNewProps {
    products: ProductType[],
    navData: ProductPageNavData,
    handleSortMenuChange: (e: SyntheticEvent<HTMLSelectElement>) => void,
    handleFilterChange: (filterSets: ProductFilterSetArguments[]) => void,
    resetFilters: () => void,
}

const ProductsPageContents: React.FC<ProductsPageContentsNewProps> = ({
    products,
    navData,
    handleSortMenuChange,
    handleFilterChange,
    resetFilters
}: ProductsPageContentsNewProps) => {
    const atLeastOneItem = products.find(ob => !ob.hiddenByFilter)
    return (<>
        <ProductPageHeader
            navData={ navData }
            itemCount= { products.length }
            onSortMenuChange= { handleSortMenuChange }
        />
        <div className="products-content-wrapper">
            { products.length > 1 &&
                <ProductPageFilters products= { products } handleFilterChange={ handleFilterChange } resetFilters={ resetFilters } />
            }
                            
            { !atLeastOneItem && <div className="padding-1">Sorry, your query return no results.</div> }

            { atLeastOneItem &&
                <ul className="products-list">
                { products.map((product) => {
                    return <ListedProduct
                        key = { product.id }
                        id = { product.id }
                        name = { product.name }
                        department = { product.department }
                        brandID= { product.brandID }
                        brand = { product.brand }
                        img = { product.img }
                        price = { product.price }
                        discountPrice= { product.discountPrice }
                        reviewCount = { product.reviewCount }
                        rating = { product.rating }
                        hiddenByFilter = {product.hiddenByFilter }
                    />
                })}
                </ul>
            }
        </div>
    </>)
}

export default ProductsPageContents