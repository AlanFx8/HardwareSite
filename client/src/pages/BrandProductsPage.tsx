import { useEffect, SyntheticEvent } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks"
import ProductsPageContents from "../components/ProductsPageContents"
import { getProducts, sortProducts, filterProducts, resetFilters } from "../features/productBrandsSlice"
import { GetProductSortType } from "../classes/GeneralUtils"
import { ProductPageNavData, ProductPageType } from "../types/mainTypes"
import { ProductType, ProductFilterSetArguments } from "../types/productTypes"
import { DataRetrieverState } from "../types/commonTypes"
import Spinner from "../components/Spinner"

const BrandProductsPage: React.FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { products, retrieverState, errorMessage } = useAppSelector(state => state.productBrands)

    //Call UseEffect to load data
    useEffect(() => {
        if (id) {
            dispatch(getProducts(id))
        }
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

    //Private Methods
    const _GetBrandName = (id: string, products: ProductType[]):string => {
        const target = products.find(ob => ob.brandID === id)
        if (target) return target.brand

        //Return original ID as fallback
        return id
    }

    //********** Render **********//
    //No ID - Should not actual happen
    if (!id) {
        return <div className="centered-object padding-1">Sorry, no brand id was given.</div>
    }

    //Loading
    if (retrieverState == DataRetrieverState.Loading) {
        return <div className="centered-object padding-1">
            <Spinner />
        </div>
    }

    //Errors
    if (retrieverState == DataRetrieverState.Failed) {
        return <div className="centered-object padding-1">Sorry there was an error: { errorMessage }</div>
    }

    if (products.length === 0) {
        return <div className="centered-object padding-1">Sorry, your seach for { id } returned no results.</div>
    }

    //Success
    if (retrieverState == DataRetrieverState.Succeded && products) {
        const navData: ProductPageNavData = {
            pageType: ProductPageType.Brand,
            brandOrDepartmentName: _GetBrandName(id, products),
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

export default BrandProductsPage