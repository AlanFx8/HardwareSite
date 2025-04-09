import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { DataRetrieverState } from "../types/commonTypes"
import { ProductType } from "../types/productTypes"

interface InitialState {
    product: ProductType | null,
    retrieverState: DataRetrieverState,
    errorMessage: string
}

const initialState = {
    product: null,
    retrieverState: DataRetrieverState.Loading,
    errorMessage: ""
} as InitialState

export const getProduct = createAsyncThunk(`productSlice/getProduct`, async(id: string, thunkAPI) => {
    try {
        const API_URL = `/api/products/${id}`
        const response = await axios.get<ProductType>(API_URL)
        return response.data
    }
    catch (error: any){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        reset: state => {
            state.product = null;
            state.errorMessage = "";
            state.retrieverState = DataRetrieverState.Loading
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProduct.pending, state => {
            state.retrieverState = DataRetrieverState.Loading
        })
        .addCase(getProduct.fulfilled, (state, action: PayloadAction<ProductType>) => {
            state.product = action.payload as ProductType
            state.retrieverState = DataRetrieverState.Succeded
        })
        .addCase(getProduct.rejected, (state, action: PayloadAction<any>) => {
            state.product = null;
            state.retrieverState = DataRetrieverState.Failed
            state.errorMessage = action.payload
        })
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer