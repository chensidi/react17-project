import Header from '@/components/Header/Header';
import { HashRouter as Router } from 'react-router-dom'

const Layout = (props) => {
    return (
        <>
            <Router>
                <Header />
            </Router>
            {props.children}
        </>
    )
}

export default Layout;