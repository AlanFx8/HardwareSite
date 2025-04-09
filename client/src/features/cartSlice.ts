import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { GetItem, SetItem } from "../classes/LocalStorage"
import { DataRetrieverState } from "../types/commonTypes"
import { OrderType } from "../types/productTypes"

const LOCAL_STORAGE_NAME = "cart_items"

interface InitialState {
    cart: OrderType[],
    retrieverState: DataRetrieverState,
    errorMessage: string
}

const initialState = {
    cart: [],
    retrieverState: DataRetrieverState.Loading,
    errorMessage: ""
} as InitialState

export const loadCartItems = createAsyncThunk("cartSlice/loadCartItems", async(data, thunkAPI) => {
    try {
        const items = GetItem<OrderType[]>(LOCAL_STORAGE_NAME);
        return (items) ? items : []
    }
    catch (error: any){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        reset: state => {
            state.cart = [];
            state.errorMessage = "";
            state.retrieverState = DataRetrieverState.Loading
            SetItem<OrderType[]>(LOCAL_STORAGE_NAME, [])
        },
        addToCart: (state, action: PayloadAction<OrderType>) => {            
            if (state.cart.length === 0) {
                state.cart.push(action.payload as OrderType)
                SetItem<OrderType[]>(LOCAL_STORAGE_NAME, state.cart)
                return
            }

            const item = action.payload as OrderType
            var isNewItem = true
            for (let x = 0; x < state.cart?.length; x++) {
                if (state.cart[x].product.id === item.product.id) {
                    state.cart[x].qty = item.qty
                    isNewItem = false
                    break
                }
            }

            if (isNewItem){
                state.cart.push(action.payload as OrderType)
            }
            SetItem<OrderType[]>(LOCAL_STORAGE_NAME, state.cart)
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload as number
            state.cart = state.cart.filter(x => x.product.id !== id)
            SetItem<OrderType[]>(LOCAL_STORAGE_NAME, state.cart)
        },
        emptyCart: (state) => {
            state.cart = []
            SetItem<OrderType[]>(LOCAL_STORAGE_NAME, [])
        }
    },
    extraReducers: builder => {
        builder
        .addCase(loadCartItems.fulfilled, (state, action: PayloadAction<OrderType[]>) => {
            state.cart = action.payload as OrderType[]
        })
    }
})

export const { reset, addToCart, removeFromCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer