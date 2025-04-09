import { Link } from 'react-router-dom'
import { ProductType } from '../types/productTypes'
import { ProductPageType } from '../types/mainTypes'
import { GetCapitalizeWord } from '../classes/GeneralUtils'

type BrandAndDepartmentLinksBuilderProps = {
    products: ProductType[],
    pageType: ProductPageType
}

//A helper component used by the HomePage, DepartmentsPage, and BrandsPage to generate link buttons
const BrandAndDepartmentLinksBuilder: React.FC<BrandAndDepartmentLinksBuilderProps> = (
    { products, pageType } : BrandAndDepartmentLinksBuilderProps) => {
    const items: { key: string, name: string, qty: number}[] = []
    for (let x = 0; x < products.length; x++) {
        const category = (pageType === ProductPageType.Department) ? products[x].department : products[x].brandID
        const duplicateItem = items.find(x => x.key === category)
        if (!duplicateItem) {
            const name = (pageType === ProductPageType.Department) ? GetCapitalizeWord(products[x].department) : products[x].brand
            items.push({ key: category, name: name, qty: 1 })
        }
        else {
            duplicateItem.qty += 1
        }
    }

    return (
        <div className="home-nav-btn-group">
            {items.map((item, index) => {
                const linkType = (pageType === ProductPageType.Department) ? 'departments' : 'brands'
                const link = `/${linkType}/${item.key}`                
                return <Link to={link} key={index} className="home-nav-btn">{item.name} ({item.qty} items)</Link>
            })}
        </div>
    )
}

export default BrandAndDepartmentLinksBuilder