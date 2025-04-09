import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
import { getProducts } from '../features/productsSlice'
import { ProductPageType } from '../types/mainTypes'
import { DataRetrieverState } from '../types/commonTypes'
import BrandAndDepartmentLinksBuilder from '../components/BrandAndDepartmentLinksBuilder'
import Spinner from '../components/Spinner'
import '../styles/home-page.scss'

const HomePage: React.FC = () => {
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
            <section className="intro-text">
                <p>Welcome to Harry's Hardware. This a portfolio site made with React, Redux, Node, Express, TypeScript, and SASS with a few other NPM packages like react-router-dom. You can browse the products of this site by their brand, department, a search query, or view all products as a whole. You can view and purchase items, which are stored in the cart and saved via local storage.</p>
            </section>

            <section className="home-nav-section">
                <h1 className="section-heading">Start By...</h1>
                <div className="home-nav-btn-group">
                    <Link to="/products" className="home-nav-btn">
                        Browse All Products ({products.length} items)
                    </Link>
                </div>
            </section>

            <section className="home-nav-section">
                <h1 className="section-heading">Or... Browse by Departments</h1>
                <BrandAndDepartmentLinksBuilder products={ products } pageType={ ProductPageType.Department } />
            </section>
            
            <section className="home-nav-section">
                <h1 className="section-heading">Or... Browse by Brands</h1>
                <BrandAndDepartmentLinksBuilder products={ products } pageType={ ProductPageType.Brand } />
            </section>
        </div>
    }
}

export default HomePage