import { configureStore } from "@reduxjs/toolkit"
import productsReducer from './features/productsSlice'
import productDepartmentsReducer from "./features/productDepartmentsSlice"
import productBrandsReducer from "./features/productBrandsSlice"
import searchReducer from "./features/searchSlice"
import productReducer from "./features/productSlice"
import cartReducer from "./features/cartSlice"

//Create the Store
const store = configureStore({
    reducer: {
        products: productsReducer,
        productDepartments: productDepartmentsReducer,
        productBrands: productBrandsReducer,
        search: searchReducer,
        product: productReducer,
        cart: cartReducer
    }
})

//Exports
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch