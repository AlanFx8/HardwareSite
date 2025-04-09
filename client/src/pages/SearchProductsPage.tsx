import { useEffect, SyntheticEvent } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../hooks"
import ProductsPageContents from "../components/ProductsPageContents"
import { getProducts, sortProducts, filterProducts, resetFilters } from "../features/searchSlice"
import { GetProductSortType } from "../classes/GeneralUtils"
import { ProductPageNavData, ProductPageType } from "../types/mainTypes"
import { ProductFilterSetArguments } from "../types/productTypes"
import { DataRetrieverState } from "../types/commonTypes"
import Spinner from "../components/Spinner"

const SearchProductsPage: React.FC = () => {
    const { query } = useParams()
    const dispatch = useAppDispatch()
    const { products, retrieverState, errorMessage } = useAppSelector(state => state.search)

    /*
    We neeed this when the search page has a second search requested
    Without this, the header is correctly updated but the actual listed products remain unchanged
    */
    const onSearchQueryUpdated = () => {
        const splitURL = window.location.href.split("/")
        const query = splitURL[splitURL.length-1]
        if (query.includes("/") || query.includes("\\")) return

        const fixedQuery = query.replace("%20", " ")
        dispatch(getProducts(fixedQuery))
    }

    //Call UseEffect to load data
    useEffect(() => {
        if (query) {
            dispatch(getProducts(query))
        }
        window.addEventListener('onUpdatedSearch', onSearchQueryUpdated, false)

		return () => {
			window.removeEventListener("onUpdatedSearch", onSearchQueryUpdated, false)
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
    //No query - Should not actual happen
    if (!query) {
        return <div className="centered-object padding-1">Sorry, no search query was given.</div>
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
        return <div className="centered-object padding-1">Sorry, your search query returned no results.</div>
    }

    //Success
    if (retrieverState == DataRetrieverState.Succeded && products) {
        const navData: ProductPageNavData = {
            pageType: ProductPageType.Search,
            brandOrDepartmentName: query,
            searchQuery: query
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

export default SearchProductsPage