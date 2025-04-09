import { useEffect, SyntheticEvent } from "react"
import { useAppSelector, useAppDispatch } from "../hooks"
import ProductsPageContents from "../components/ProductsPageContents"
import { getProducts, sortProducts, filterProducts, resetFilters } from "../features/productsSlice"
import { GetProductSortType } from "../classes/GeneralUtils"
import { ProductPageNavData, ProductPageType } from "../types/mainTypes"
import { ProductFilterSetArguments } from "../types/productTypes"
import { DataRetrieverState } from "../types/commonTypes"
import Spinner from "../components/Spinner"

const ProductsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { products, retrieverState, errorMessage } = useAppSelector(state => state.products)

    //Call UseEffect to load data
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    //********** Methods **********//
    const HandleSortMenuChange = (e: SyntheticEvent<HTMLSelectElement>) => {
        dispatch(sortProducts(GetProductSortType(e)))
    }

    const HandleFilterChange = (filterSets: ProductFilterSetArguments[]) => {
        dispatch(filterProducts(filterSets))
    }

    const ResetFilters = () => {
        dispatch(resetFilters())
    }

    //********** Render **********//
    //Loading
    if (retrieverState == DataRetrieverState.Loading) {
        return <div className="centered-object padding-1">
            <Spinner />
        </div>
    }

    //Error
    if (retrieverState == DataRetrieverState.Failed) {
        return <div className="centered-object padding-1">Sorry there was an error: { errorMessage }</div>
    }

    //Success
    if (retrieverState == DataRetrieverState.Succeded && products) {
        const navData: ProductPageNavData = {
            pageType: ProductPageType.Products,
            brandOrDepartmentName: "",
            searchQuery: ""
        }

        return <ProductsPageContents
            products={ products }
            navData={ navData }
            handleFilterChange={ HandleFilterChange }
            handleSortMenuChange={ HandleSortMenuChange }
            resetFilters={ ResetFilters }
        />
    }
}

export default ProductsPage