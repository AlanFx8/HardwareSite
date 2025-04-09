import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

//Import Layout and Pages
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductPage from './pages/ProductPage'
import DepartmentsPage from './pages/DepartmentsPage'
import DepartmentProductsPage from './pages/DepartmentProductsPage'
import BrandsPage from './pages/BrandsPage'
import BrandProductsPage from './pages/BrandProductsPage'
import SearchProductsPage from './pages/SearchProductsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Error404Page from './pages/Error404Page'
import './styles/app.scss'

//Build the Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = { <MainLayout /> } >
      <Route index element = { <HomePage />} />
      <Route path='/products' element = { <ProductsPage /> } />

      {/*Departments*/}
      <Route path='/departments/' element = { <DepartmentsPage /> } />
      <Route path='/departments/:id/' element = { <DepartmentProductsPage /> } />
      <Route path='/departments/:department/:id' element = { <ProductPage /> } />

      {/*Brands*/}
      <Route path='/brands/' element = { <BrandsPage /> } />
      <Route path='/brands/:id' element = { <BrandProductsPage /> } />

      {/*Search*/}
      <Route path='/search/:query' element = { <SearchProductsPage /> } />

      {/*Cart and Checkout*/}
      <Route path='/cart' element = { <CartPage /> } />
      <Route path='/checkout' element = { <CheckoutPage /> } />

      {/*404 Error*/}
      <Route path='*' element = { <Error404Page /> } />
    </Route>
  )
)

//The App component
const App = () => {
  return <RouterProvider router={ router } />
}

export default App