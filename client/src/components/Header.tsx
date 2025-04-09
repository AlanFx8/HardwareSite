import { useEffect, SyntheticEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../hooks'
import { loadCartItems } from "../features/cartSlice"
import { GetSearchString } from '../classes/GeneralUtils'
import { GetTotalItems,GetFullOrderCost } from "../classes/MoneyHelper"
import { onUpdatedSearch } from "../classes/Events"
import logo from '../assets/img/logo.png'
import '../styles/header.scss'

const Header: React.FC = () => {
    const navigate = useNavigate()

    const _OnSearchRequest =  (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const query = GetSearchString(e)

        //For now, just return if a slash is detected
        if (query.includes("/") || query.includes("\\")) return
        
        if (window.location.href.includes("search") && !window.location.href.trim().endsWith(query)){
            navigate(`/search/${query}`)
            window.dispatchEvent(onUpdatedSearch)
        }
        else {
            navigate(`/search/${query}`)
        }
    }

    return (
        <header id="header">
            <div className="header-content">
                <section className="intro-links-section">
                    <div className="intro-links-section-inner">
                        <div className="deliever-message">
                            <strong>We Deliver.</strong> Get what you need, when you need it.
                        </div>
                        <div className="inrto-links">
                            <span><a href="/">Sign In / Register</a></span>
                            <span><a href="/">Customer Service</a></span>
                            <span><a href="/">Store Locator</a></span>
                        </div>
                    </div>
                </section>

                <section className="page-header">
                    <div className="logo-header">
                        <Link to="/">
                            <img src={logo} title="Harry's Hardware" alt="Harry's Hardware logo" />
                        </Link>
                    </div>

                    <div className="search-header">
                        <form id="search-form" name="search-form" onSubmit={ _OnSearchRequest }>
                            <input type="search" placeholder="What are you looking for?" />
                            <button type="submit">
                                <FaSearch />
                            </button>
                        </form>
                    </div>

                    <HeaderCart />
                </section>
            </div>
        </header>
    )
}

const HeaderCart: React.FC = () => {
    const dispatch = useAppDispatch()
    const { cart } = useAppSelector(state => state.cart)
    
    useEffect(() => {
        dispatch(loadCartItems());
    }, [dispatch])

    return (
        <div className="header-cart">
            <Link to="/cart" className="header-cart-inner">
                <FaShoppingCart className="cart-icon" />
                <div className="cart-header-info">
                    {cart.length === 0 && 
                        <p>
                            Empty <br/>
                            Cart
                        </p >
                    }
                    {cart.length > 0 &&
                        <p>
                            {GetTotalItems(cart)} Item(s) <br/>
                            ${GetFullOrderCost(cart)}
                        </p>
                    }
                </div>
            </Link>
        </div>
    )
}

export default Header