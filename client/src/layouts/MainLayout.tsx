import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollButton from '../components/ScrollButton'
import MainContentWrapper from '../components/MainContentWrapper'

const MainLayout: React.FC = () => {
    return (<>
        <Header />
        <MainContentWrapper>
            <Outlet />
        </MainContentWrapper>
        <Footer />
        <ScrollButton />
    </>)
}

export default MainLayout