import { SyntheticEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaShoppingCart } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from "../hooks"
import ThumbnailImage from "../components/ThumbnailImage"
import { loadCartItems, addToCart, removeFromCart, emptyCart } from "../features/cartSlice"
import { Clamp } from "../classes/MathHelper"
import { GetFullOrderCost, GetSingleOrderCost } from "../classes/MoneyHelper"
import { OrderType } from "../types/productTypes"
import "../styles/cart-page.scss"

const CartPage: React.FC = () => {
    //#region Start
    const MIN_QTY = 1
    const MAX_QTY = 20

    //Set up reducer and navigation
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(state => state.cart)
    const navigate = useNavigate()

    //Call UseEffect to load cart
    useEffect(() => {
        dispatch(loadCartItems());
    }, [dispatch])
    //#endregion

    //#region Methods
    const _OnQtyChange = (e: SyntheticEvent<HTMLInputElement>, id: number) => {
        const target = e.target as HTMLInputElement
        const value = parseInt(target.value)
        if (!Number(value)) return
        const item = cart.find(x => x.product.id === id)
        if (item) {
            dispatch(addToCart({ product: item.product, qty: Clamp(value, MIN_QTY, MAX_QTY)}))
        }
    }

    const _OnQtyDecrease = (id: number) => {
        const item = cart.find(x => x.product.id === id)
        if (item && item.qty > MIN_QTY) {
            dispatch(addToCart({ product: item.product, qty: item.qty - 1}))
        }
    }

    const _OnQtyIncrease = (id: number) => {
        const item = cart.find(x => x.product.id === id)
        if (item && item.qty < MAX_QTY) {
            dispatch(addToCart({ product: item.product, qty: item.qty + 1}))
        }
    }

    const _OnRemoveItem = (id: number) => {
        const item = cart.find(x => x.product.id === id)
        if (item) {
            dispatch(removeFromCart(item.product.id))
        }
    }

    const _OnBackRequest = () => {
        navigate("/products")
    }

    const _OnCheckoutRequest = () => {
        dispatch(emptyCart())
        navigate("/checkout")
    }
    //#endregion

    //#region Render
    if (cart && cart.length === 0) {
        return <div className="centered-object">
            <div>
                <p>Sorry, the cart is empty.</p>
                <p>Click <Link to="/products" className="basic-link">here</Link> to start browsing our products.</p>
            </div>
        </div>
    }

    if (cart && cart.length > 0) {
        const cartItems = cart.map((item, index) => {
            return <CartItemBuilder
                order={ item }
                index={ index }
                key={ index }
                qtyMin={ MIN_QTY }
                qtyMax={ MAX_QTY }
                onQtyChange={ _OnQtyChange }
                onQtyDecrease={ _OnQtyDecrease }
                onQtyIncrease={ _OnQtyIncrease }
                onRemoveItem={ _OnRemoveItem }
            />
        })

        return <>
            <section className="cart-header">
                <div className="cart-header-title">
                    <FaShoppingCart  className="cart-icon"/>
                    <h2>Shopping Cart</h2>
                </div>
                <div className="cart-btn-wrapper">
                    <BackBTNBuilder
                        onGoBack={ _OnBackRequest }
                        onGoToCheckout={ _OnCheckoutRequest }
                    />
                    <CheckoutBTNBuilder
                        onGoBack={ _OnBackRequest }
                        onGoToCheckout={ _OnCheckoutRequest }
                    />
                </div>
            </section>

            <section className="cart-body">
                <div className="purchase-headings">
                    <div>Product</div>
                    <div>Quantity</div>
                    <div>Prices</div>
                </div>
                <ul className="purchases">
                    { cartItems }
                </ul>
            </section>

            <section className="cart-footer">
                <h2 className="total-order">Total Order: ${GetFullOrderCost(cart)}</h2>
                <div className="cart-btn-wrapper">
                    <BackBTNBuilder
                        onGoBack={ _OnBackRequest }
                        onGoToCheckout={ _OnCheckoutRequest }
                    />
                    <CheckoutBTNBuilder
                        onGoBack={ _OnBackRequest }
                        onGoToCheckout={ _OnCheckoutRequest }
                    />
                </div>
            </section>
        </>
    }

    //Cart isn't loaded?
    return <>
        <p>Loading items...</p>
    </>
    //#endregion
}

//***SUB-CLASSES***//
type CartItemBuilderProps = {
    order: OrderType,
    index: number,
    qtyMin: number,
    qtyMax: number,
    onQtyChange: (e: SyntheticEvent<HTMLInputElement>, id: number) => void,
    onQtyDecrease: (id: number) => void,
    onQtyIncrease: (id: number) => void,
    onRemoveItem: (id: number) => void
}

type CartPageSubComponentsProps = {
    onGoBack: () => void,
    onGoToCheckout: () => void
}

const CartItemBuilder: React.FC<CartItemBuilderProps> = (props: CartItemBuilderProps) => {
    const { order, index } = props
    const { product } = order
    const id = order.product.id
    const qty = order.qty
    const price = (product.discountPrice)?product.discountPrice:product.price
    
    return <li className="purchase" key={ index }>
        <section className="purchase-product">
            <ThumbnailImage product={ product } isLink={ false } />
            <div className="info">
                <span className="name">{product.name}</span>
                <span className="id">Item no. {product.id}</span>
            </div>
        </section>

        <section className="purchase-quantity">
            <div className="qty-handler">
                <button
                    type="button"
                    onClick={ () => props.onQtyDecrease(id) }
                    id="decrease-button"
                >
                    {'-'}
                </button>
                <input
                    type="number"
                    value={ qty }
                    min={ props.qtyMin }
                    max={ props.qtyMax }
                    onChange={ e => props.onQtyChange(e, id) }
                />
                <button
                    type="button"
                    onClick={ () => props.onQtyIncrease(id) }
                    id="increase-button"
                >
                    {'+'}
                </button>
            </div>
            <div className="remove-handler">
                <span>-Or-</span>
                <div className="remove-btn-wrapper">
                    <button
                        type="button"
                        name="removeBTN"
                        id="removeBTN"
                        onClick={() => props.onRemoveItem(id)}
                    >
                        Remove from cart
                    </button>
                </div>
            </div>
        </section>

        <section className="purchase-prices">
            <span>
                Each Price: ${price}
            </span>
            <span>
                Total price: ${GetSingleOrderCost(order)}
            </span>
        </section>
    </li>
}

const CheckoutBTNBuilder: React.FC<CartPageSubComponentsProps> = ({ onGoToCheckout }: CartPageSubComponentsProps) => {
    return (
        <button
            className="cart-checkout-btn in-cart-page"
            type="button"
            onClick={ onGoToCheckout }
        >
            Checkout
        </button>
    )
}

const BackBTNBuilder: React.FC<CartPageSubComponentsProps> = ({ onGoBack }: CartPageSubComponentsProps) => {
    return (
        <button
            className="continue-shopping-btn in-cart-page"
            type="button"
            onClick={ onGoBack }
        >
            Continue Shopping
        </button>
    )
}

//***EXPORT***//
export default CartPage