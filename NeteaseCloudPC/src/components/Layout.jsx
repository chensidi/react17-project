import Header from '@/components/Header/Header';
import { HashRouter as Router } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';

const Layout = (props) => {
    return (
        <>
            <Router>
                <Header />
            </Router>
            {props.children}
            <Footer />
        </>
    )
}

export default Layout;