import { useLocation, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Main from '@/components/Main';
import { MyMenu } from './components/menu/Menu';
import { setSubNav } from '@store/action';

const MyMusic = (props) => {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (location.pathname === "/my/music") {
            history.replace('/my/music/artist')
        }
        dispatch(setSubNav(false));
    })


    return (
        <Main>
           <MyMenu />
           <div className="m-right">
               { props.children }
           </div>
        </Main>
    )
}

export default MyMusic;