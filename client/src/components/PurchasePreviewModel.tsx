import { useEffect, SyntheticEvent } from "react"
import { useAppSelector } from "../hooks"
import { FaShoppingCart, FaTimes } from 'react-icons/fa'
import { GetTotalItems, GetFullOrderCost } from "../classes/MoneyHelper"
import { ProductType } from "../types/productTypes"
import '../styles/purchase-preview-model.scss'

type PurchasePreviewModelProps = {
    product: ProductType,
    qty: number,
    closeModel: () => void,
    goToCart: () => void
}

const PurchasePreviewModel: React.FC<PurchasePreviewModelProps> = ({
    product,
    qty,
    closeModel,
    goToCart
}) => {
    const MODEL_NAME = "purchase-preview-model"

    //Set up selector
    const { cart } = useAppSelector(state => state.cart)

    useEffect(() => {
        window.addEventListener('keyup', _OnKeyInput);
        return () => {
			window.removeEventListener("keyup", _OnKeyInput)
		}
    }, [])

    /*** METHODS ***/
    const _OnClick = (e: SyntheticEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        if (target.id === MODEL_NAME) {
            closeModel()
        }
    }

    const _OnKeyInput = (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            closeModel()
        }
    }

    /*** RENDER ***/
    return (<div id = "purchase-preview-model" onClick={ _OnClick }>
        <div id="purchase-preview-panel">
            {/* CART HEADER */}
            <header className="purchase-preview-header">
                <div className="header-title">
                    <FaShoppingCart  className="cart-icon"/>
                    <h2>Added to Your Cart</h2>
                </div>
                <div className="close-btn" onClick={ closeModel }>
                    <FaTimes />
                </div>
            </header>

            {/* CART BODY */}
            <main className="purchase-preview-body">
                <div className="preview-body-img">
                    <img
                        src={`../../img/products/${product.department}/${product.img}.jpg`}
                        alt={"A preview"} title={product.name}
                    />
                </div>
                <div className="preview-body-info">
                    <h2>{product.name}</h2>
                    <span className="price">${product.discountPrice || product.price}</span>
                    <span>Qty: {qty}</span>
                </div>
                <div className="preview-body-total">
                    <div>
                        Total Items in Cart: { GetTotalItems(cart) }
                    </div>
                    <div>
                        Subtotal: ${ GetFullOrderCost(cart)}
                    </div>
                </div>
            </main>

            {/* CART FOOTER */}
            <footer className="purchase-preview-footer">
                <button
                    type="button"
                    className="continue-shopping-btn"
                    onClick={ closeModel }
                >
                    Continue Shoping
                </button>
                <button
                    type="button"
                    className="cart-checkout-btn"
                    onClick={ goToCart }
                >
                    Go To Cart
                </button>
            </footer>
        </div>
    </div>)
}

export default PurchasePreviewModel