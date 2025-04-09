import React, { SyntheticEvent } from "react"
import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import '../styles/footer.scss'

const Footer: React.FC = () => {
    return (
        <footer id="footer">
            <div className="footer-content">
                <FooterLinksSection />
                <hr />
                <NewsletterSection />
                <hr />
                <SocialMediaLinksSections />
                <TermsOfServiceSection />
                <CopyrightSection />
            </div>
        </footer>
    )
}

const FooterLinksSection: React.FC = () => {
    const _ToggleLinkGroup = (id: number) => {
        document.getElementsByClassName("footer-link-button")[id].classList.toggle("open")
    }

    return (
        <section className="footer-links">
            <div className="footer-link-group">
                <button type="button" className="footer-link-button" onClick={() => _ToggleLinkGroup(0)}>More Ways to Shop</button>
                <div className="footer-link-set">
                    <span className="footer-link"><Link to="/">Store Locator</Link></span>
                    <span className="footer-link"><Link to="/">Shop Our Ad</Link></span>
                    <span className="footer-link"><Link to="/">Brands We Love</Link></span>
                    <span className="footer-link"><Link to="/">Store Directory</Link></span>
                    <span className="footer-link"><Link to="/">Gift Cards</Link></span>
                </div>
            </div>

            <div className="footer-link-group">
                <button type="button" className="footer-link-button" onClick={() => _ToggleLinkGroup(1)}>Customer Service</button>
                <div className="footer-link-set">
                    <span className="footer-link"><Link to="/">Contact Us</Link></span>
                    <span className="footer-link"><Link to="/">Track Your Order</Link></span>
                    <span className="footer-link"><Link to="/">Easy Returns</Link></span>
                    <span className="footer-link"><Link to="/">Shipping, Pickup &#38; Delivery</Link></span>
                </div>
            </div>

            <div className="footer-link-group">
                <button type="button" className="footer-link-button" onClick={() => _ToggleLinkGroup(2)}>Resources</button>
                <div className="footer-link-set">
                    <span className="footer-link"><Link to="/">Tips &#38; Advice</Link></span>
                    <span className="footer-link"><Link to="/">Sales &#38; Specials</Link></span>
                    <span className="footer-link"><Link to="/">Store Services</Link></span>
                    <span className="footer-link"><Link to="/">Newsroom</Link></span>
                    <span className="footer-link"><Link to="/">Annual Report</Link></span>
                    <span className="footer-link"><Link to="/">Harry's Hardware Services</Link></span>
                </div>
            </div>
        </section>
    )
}

const NewsletterSection: React.FC = () => {
    const _OnNewsleterSignup = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        alert("Thank you for joining!");
    }

    return (
        <section className="newsletter">
            <div>
                Sign up for Latest Offers and tips
            </div>
            <div>
                <input type="text" placeholder="Sign up for email." name="newsletter" />
                <button type="button"  onClick={ _OnNewsleterSignup }>JOIN</button>
            </div>
        </section>
    )
}

const SocialMediaLinksSections: React.FC = () => {
    return (
        <section className="social-media-links">
            <p>Follow us on...</p>
            <span>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
            </span>
            <span>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
            </span>
            <span>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </span>
            <span>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube />
                </a>
            </span>
        </section>
    )
}

const TermsOfServiceSection: React.FC = () => {
    return(
        <section className="terms-of-service-links">
            <span><Link to="/">Terms of Use</Link></span>
            <span><Link to="/">Privacy Policy</Link></span>
            <span><Link to="/">Interest Based Ads</Link></span>
            <span><Link to="/">Do Not Sell My Personal Information</Link></span>
        </section>
    )
}

const CopyrightSection: React.FC = () => {
    return (
        <section className="copyright-notice">
            <p>&copy; 2025 Harry's Hardware. Harry's Hardware and the Harry's Hardware logo are registered trademarks of Harry's Hardware Corporation. All rights reserved.</p>
        </section>
    )
}

export default Footer