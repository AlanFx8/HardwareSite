import { SyntheticEvent, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getProduct } from "../features/productSlice"
import { loadCartItems,addToCart } from "../features/cartSlice"
import { DataRetrieverState } from "../types/commonTypes"
import ProductPanel from "../components/ProductPanel"
import PurchasePreviewModel from "../components/PurchasePreviewModel"
import Spinner from "../components/Spinner"
import { Clamp } from "../classes/MathHelper"

const ProductPage: React.FC = () => {
    //Set const fields
    const MIN_QTY = 1
    const MAX_QTY = 20

    //Set up states and grab Router params
    const [qty, setQty] = useState<number>(MIN_QTY)
    const [modelOpen, setModel] = useState<boolean>(false)
    const { id } = useParams()

    //Set up dispatch and selector
    const dispatch = useAppDispatch()
    const { product, retrieverState, errorMessage } = useAppSelector(state => state.product)

    //Setup useNavigate
    const navigate = useNavigate()

    //Call UseEffect to get product info and load the cart
    useEffect(() => {
        dispatch(getProduct(id as string))
        dispatch(loadCartItems())
    }, [dispatch])

    /***METHODS***/
    const _OnQtyDecrease = () => {
        if (qty === MIN_QTY) return
        setQty(state => state -1)
    }

    const _OnQtyIncrease = () => {
        if (qty === MAX_QTY) return
        setQty(state => state +1)
    }

    const _SetQty = (e: SyntheticEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const value = parseInt(target.value)
        if (Number(value)) {
            const clampedValue = Clamp(value, MIN_QTY, MAX_QTY)
            setQty(clampedValue)
        }
    }

    const _AddToCart = () => {
        if (!product) return
        dispatch(addToCart({ product, qty: qty}))
        setModel(true)
    }

    const _CloseModel = () => {        
        setModel(false)
    }

    const _GoToCart = () => {
        navigate("/cart")
    }

    /***RENDER***/
    //Loading
    if (retrieverState == DataRetrieverState.Loading) {
        return <div className="centered-object">
            <Spinner />
        </div>
    }

    //Error
    if (retrieverState == DataRetrieverState.Failed) {
        return <div>Sorry there was an error: { errorMessage }</div>
    }

    //Success
    if (retrieverState == DataRetrieverState.Succeded && product) {
        return (<>
        <ProductPanel
            product = { product }
            qty = { qty }
            qtyMin = { MIN_QTY }
            qtyMax = { MAX_QTY }
            setQty = { _SetQty }
            onQtyDecrease = { _OnQtyDecrease }
            onQtyIncrease = { _OnQtyIncrease }
            onAddToCart= { _AddToCart}
        />
        { modelOpen && <PurchasePreviewModel
            product={ product } qty={ qty } closeModel={ _CloseModel } goToCart={ _GoToCart }
        />}
        </>)
    }
}

export default ProductPage