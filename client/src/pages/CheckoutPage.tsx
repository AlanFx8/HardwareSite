import { Link } from 'react-router-dom'

const CheckoutPage: React.FC = () => {
    return (<div className="padding-1">
            <h1>THANK YOU!</h1>
            <p>You're order has been placed!</p>
            <p>Click <Link to="/products" className="basic-link">here</Link> to continue shoping</p>
    </div>)
}

export default CheckoutPage