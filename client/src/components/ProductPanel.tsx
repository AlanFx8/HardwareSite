import { SyntheticEvent } from 'react'
import ProductRating from './ProductRating'
import ProductPrice from './ProductPrice'
import { ProductType } from '../types/productTypes'
import '../styles/product-panel.scss'

/* Represents a single product in detail */
type ProductPanelProps = {
    product: ProductType,
    qty: number,
    qtyMin: number,
    qtyMax: number,
    setQty: (e: SyntheticEvent<HTMLInputElement>) => void,
    onQtyDecrease: () => void,
    onQtyIncrease: () => void,
    onAddToCart: () => void
}

const ProductPanel: React.FC<ProductPanelProps> = ({
    product,
    qty,
    qtyMin,
    qtyMax,
    setQty,
    onQtyDecrease,
    onQtyIncrease,
    onAddToCart
}) => {
    return <div className="product-panel">
        {/* Header */}
        <div className="product-panel-image">
            <img src={`../../img/products/${product.department}/${product.img}.jpg`}
            alt={"A preview"} title={product.name} />
        </div>

        {/* Details */}
        <div className="product-panel-details">
            <h1 className="name">{ product.name }</h1>
            <p className="item-id">Item no. {product.id}</p>
            <ProductRating  rating={product.rating} reviewCount={product.reviewCount} />
            <ProductPrice discountPrice={product.discountPrice} price={product.price} />
        </div>

        {/* Opions */}
        <div className="product-panel-actions">
            <div className="qty-handler">
                <button
                    type="button"
                    onClick={ onQtyDecrease }
                    id="decrease-button"
                >
                    {'-'}
                </button>
                <input
                    type="number"
                    value={ qty }
                    min={ qtyMin }
                    max={ qtyMax }
                    onChange={ setQty }
                />
                <button
                    type="button"
                    onClick={ onQtyIncrease }
                    id="increase-button"
                >
                    {'+'}
                </button>
            </div>
            <button
                type="button"
                onClick={ onAddToCart }
                className="cart-checkout-btn"
            >
                Add To Cart
            </button>
        </div>
    </div>
}

export default ProductPanel