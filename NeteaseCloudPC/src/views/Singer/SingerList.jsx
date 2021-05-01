import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import Main from '@/components/Main';
import CateAside from './CateAside';

const SingerList = (props) => {

    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname.endsWith('/singer')) {
            history.replace('/home/singer/cate/recommend')
        }
    }, [])
    
    return (
        <Main className="g-bd2">
            <CateAside />
            {
                props.children
            }
        </Main>
    )
}

export default SingerList;