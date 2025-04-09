import { useEffect, SyntheticEvent } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks"
import ProductsPageContents from "../components/ProductsPageContents"
import { GetCapitalizeWord } from '../classes/GeneralUtils'
import { getProducts, sortProducts, filterProducts, resetFilters } from "../features/productDepartmentsSlice"
import { GetProductSortType } from "../classes/GeneralUtils"
import { ProductPageNavData, ProductPageType } from "../types/mainTypes"
import { ProductFilterSetArguments } from "../types/productTypes"
import { DataRetrieverState } from "../types/commonTypes"
import Spinner from "../components/Spinner"

const DepartmentProductsPage: React.FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { products, retrieverState, errorMessage } = useAppSelector(state => state.productDepartments)

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

    //********** Render **********//
    //No ID - Should not actual happen
    if (!id) {
        return <div className="centered-object padding-1">Sorry, no department id was given.</div>
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
            pageType: ProductPageType.Department,
            brandOrDepartmentName: GetCapitalizeWord(id),
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

export default DepartmentProductsPage