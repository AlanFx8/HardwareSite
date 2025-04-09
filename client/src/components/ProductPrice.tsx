import React from 'react';
import '../styles/product-price.scss'

interface ProductPriceProps {
    discountPrice: number| null,
    price: number
}

const ProductPrice: React.FC<ProductPriceProps> = ({ discountPrice, price }: ProductPriceProps) => {
    return (    
        <div className="product-price">
            {discountPrice && <span className="product-price-current">
                ${discountPrice}
            </span>}
            <span className={(discountPrice)?'product-price-old':'product-price-current'} >
                ${price}
            </span>
        </div>
    )
}

export default ProductPrice