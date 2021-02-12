import Header from '@/components/Header/Header';
import { HashRouter as Router } from 'react-router-dom';
import Footer from '@/components/Footer/Footer';
import PlayBar from '@/components/PlayBar/PlayBar';

const Layout = (props) => {
    return (
        <>
            <Router>
                <Header />
            </Router>
            {props.children}
            <Footer />
            <Router>
                <PlayBar />
            </Router>
        </>
    )
}

export default Layout;