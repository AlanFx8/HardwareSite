import '../styles/product-rating.scss'

interface ProductRatingProps {
    rating: number,
    reviewCount: number
}

const ProductRating: React.FC<ProductRatingProps> = ({rating, reviewCount}: ProductRatingProps) => {
    const _rating = rating * 10;
    const _ratingPercentage = (_rating / 50) * 100;
    const _styleString = {width: `${_ratingPercentage}%`};

    return (
        <div className="product-reviews">
            <span className="product-rating-background">
                <span className="product-rating" style={ _styleString } />
            </span>
            <span className="product-review-count">
                ({ reviewCount } reviews)
            </span>
        </div>
    )
}

export default ProductRating