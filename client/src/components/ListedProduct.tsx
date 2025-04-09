import { Link } from 'react-router-dom'
import ProductRating from './ProductRating'
import ProductPrice from './ProductPrice'
import ThumbnailImage from './ThumbnailImage'
import { ProductType } from '../types/productTypes'
import '../styles/listed-product.scss'

//This component represents basic product info as part of a list of results
const ListedProduct: React.FC<ProductType> = (props: ProductType) => {
    const _link = `/departments/${ props.department }/${ props.id }`
    const _class = (props.hiddenByFilter) ? 'listed-product hidden' : 'listed-product'

    return (<li className= { _class }>
        { /*The Product Image and Link*/ }
        <ThumbnailImage product={ props } isLink={ true } />
        
        { /*Product Info*/ }
        <div className="listed-product-name">
            <Link to={_link}>
                { props.name }
            </Link>
        </div>

        { /*ProductRating and ProductPrice*/ }
        <ProductRating rating={ props.rating } reviewCount={ props.reviewCount } />
        <ProductPrice price={ props.price } discountPrice={ props.discountPrice } />
    </li>)
}

export default ListedProduct