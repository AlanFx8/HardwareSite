import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import SortProducts from "../classes/ProductSorter"
import { FilterProducts, ResetFilters } from "../classes/ProductFilterer"
import { DataRetrieverState } from "../types/commonTypes"
import { ProductType, ProductSortType, ProductFilterSetArguments } from "../types/productTypes"

interface InitialState {
    products: ProductType[],
    retrieverState: DataRetrieverState,
    errorMessage: string
}

const initialState = {
    products: [],
    retrieverState: DataRetrieverState.Loading,
    errorMessage: ""
} as InitialState

export const getProducts = createAsyncThunk("productDepartmentsSlice/getProducts", async(id: string, thunkAPI) => {
    try {
        const API_URL = `/api/products/departments/${id}`
        const response = await axios.get<ProductType[]>(API_URL)
        return response.data
    }
    catch (error: any){
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const productDepartmentsSlice = createSlice({
    name: "productDepartmentsSlice",
    initialState,
    reducers: {
        reset: state => {
            state.products = [];
            state.errorMessage = "";
            state.retrieverState = DataRetrieverState.Loading
        },
        sortProducts: (state, action: PayloadAction<ProductSortType>) => {
            state.products = SortProducts(state.products!, action.payload)
        },
        filterProducts: (state, action: PayloadAction<ProductFilterSetArguments[]>) => {
            state.products = FilterProducts(state.products!, action.payload)
        },
        resetFilters: (state) => {
            state.products = ResetFilters(state.products!)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getProducts.pending, state => {
            state.retrieverState = DataRetrieverState.Loading
        })
        .addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload as ProductType[]
            state.retrieverState = DataRetrieverState.Succeded
        })
        .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
            state.products = [];
            state.retrieverState = DataRetrieverState.Failed
            state.errorMessage = action.payload
        })
    }
})

export const { reset, sortProducts, filterProducts, resetFilters } = productDepartmentsSlice.actions
export default productDepartmentsSlice.reducer