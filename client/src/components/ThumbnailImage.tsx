import { Link } from 'react-router-dom'
import { ProductType } from "../types/productTypes"

type ThumbnailImageProps = {
    product: ProductType,
    isLink: boolean
}

//Thumbnail Images are used in both the ListedProduct and Cart pages hence this helper class
const ThumbnailImage: React.FC<ThumbnailImageProps> = ({ product, isLink}: ThumbnailImageProps) => {
    const _imgClass = 'listed-product-img'
    const _imgClassDepartment = `${product.department}-img`
    const _imgClassDepartmentID = `${product.department}-img-${product.id}`
    const _fullImgClass = `${_imgClass} ${_imgClassDepartment} ${_imgClassDepartmentID}`

    const _link = `/departments/${ product.department }/${ product.id }`

    if (isLink) {
        return (
            <div className="listed-product-img-wrapper">
                <Link to={ _link }>
                    <div className= { _fullImgClass }></div>
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className="listed-product-img-wrapper">
                <div className= { _fullImgClass }></div>
            </div>
        )
    }
}

export default ThumbnailImage