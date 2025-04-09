import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getProducts } from '../features/productsSlice'
import { ProductPageType } from '../types/mainTypes'
import { DataRetrieverState } from '../types/commonTypes'
import BrandAndDepartmentLinksBuilder from '../components/BrandAndDepartmentLinksBuilder'
import Spinner from '../components/Spinner'
import '../styles/home-page.scss'

const BrandsPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { products, retrieverState, errorMessage } = useAppSelector(state => state.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    if (retrieverState == DataRetrieverState.Loading) {
        return <div className="centered-object">
            <Spinner />
        </div>
    }

    if (retrieverState == DataRetrieverState.Failed) {
        return <div>Sorry there was an error: { errorMessage }</div>
    }

    if (retrieverState == DataRetrieverState.Succeded && products) {
        return <div id="home">            
            <section className="home-nav-section">
                <h1 className="section-heading">Browse by Brands</h1>
                <strong>Browse by all your favourite brands!</strong>
                <BrandAndDepartmentLinksBuilder products={ products } pageType={ ProductPageType.Brand } />
            </section>
        </div>
    }
}

export default BrandsPage