import { SyntheticEvent } from "react"
import { Link } from "react-router-dom"
import { ProductPageNavData, ProductPageType } from "../types/mainTypes"
import '../styles/product-page-header.scss'

//#region TYPES
type ProductPageHeaderProps = {
    navData: ProductPageNavData,
    itemCount: number,
    onSortMenuChange: (e: SyntheticEvent<HTMLSelectElement>) => void
}

type HeaderNavigationProps = {
    navData: ProductPageNavData
}

type HeaderQueryResultsProps = HeaderNavigationProps & { itemCount: number }

type HeaderOptionsMenuProps = {
    onSortMenuChange: (e: SyntheticEvent<HTMLSelectElement>) => void
}
//#endregion

//#region PRODUCT PAGE HEADER
const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({ navData, itemCount, onSortMenuChange }: ProductPageHeaderProps) => {
    return <div className="products-menu">
        <HeaderNavigation navData={ navData } />
        <div className="products-menu-content">
            <HeaderQueryResults navData={ navData } itemCount= { itemCount } />
            <HeaderOptionsMenu onSortMenuChange = { onSortMenuChange! } />
        </div>     
    </div>
}
//#endregion

//#region HEADER NAVIGATION COMPONENT
const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ navData }: HeaderNavigationProps) => {
    return (<div className="products-menu-nav">
        {/*All Products*/}
        { navData.pageType === ProductPageType.Products && <>
            <Link to='/'>Home</Link> { '>' } Products
        </> }

        {/*Departments*/}
        { navData.pageType === ProductPageType.Department && <>
            <Link to='/'>Home</Link> { '>' } <Link to="/departments">Departments</Link> { '>' } { navData.brandOrDepartmentName }
        </> }

        {/*Brands*/}
        { navData.pageType === ProductPageType.Brand && <>
            <Link to='/'>Home</Link> { '>' } <Link to="/brands">Brands</Link> { '>' } { navData.brandOrDepartmentName }
        </> }

        {/*Search*/}
        { navData.pageType === ProductPageType.Search && <>
            <Link to='/'>Home</Link> { '>' } Search for '{navData.searchQuery}'
        </> }
    </div>)
}
//#endregion

//#region HEADER QUERY COMPONENT
const HeaderQueryResults: React.FC<HeaderQueryResultsProps> = ({ navData, itemCount }) => {
    const _GetNavHeader = ():string => {
        const type = navData.pageType
        if (type === ProductPageType.Brand) return `Brands / ${ navData.brandOrDepartmentName }`
        if (type === ProductPageType.Department) return `Departments / ${ navData.brandOrDepartmentName }`
        if (type === ProductPageType.Search) return `Search for '${ navData.brandOrDepartmentName }'`
        return "All Products"
    }

    const navHeader = _GetNavHeader()

    return (<h1 className="products-menu-results">
        { navHeader } ({ itemCount } item(s) found)
    </h1>)
}
//#endregion

//#region HEADER OPTIONS MENU COMPONENT
const HeaderOptionsMenu: React.FC<HeaderOptionsMenuProps> = ({ onSortMenuChange }) => {
    return <div className="products-menu-sort-options">Sort by 
        <select className="sort-products-select" onChange = { onSortMenuChange }>
            <option value="R">Recommended</option>
            <option value="T">Top Rated</option>
            <option value="LowHigh">Price: Low to High</option>
            <option value="HighLow">Price: High to Low</option>
            <option value="AZ">Alphabetical: A-Z</option>
            <option value="ZA">Alphabetical: Z-A</option>
        </select>
    </div>
}
//#endregion

/***EXPORTS***/
export default ProductPageHeader