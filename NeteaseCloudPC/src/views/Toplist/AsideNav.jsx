import { Link, useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext, createContext } from 'react';

const ActiveId = createContext();
const ListItem = (props) => {

    const activeId = Number(useContext(ActiveId));
    
    const { coverImgUrl = '', name = '', updateFrequency = '', id = 0 } = props;
    return (
        <li className={`mine ${activeId===id?'z-selected':''}`}>
            <div className="item f-cb">
                <div className="left">
                    <Link to={`/toplist/${id}`} className="avatar">
                        <LazyLoadImage width={40} height={40} src={coverImgUrl}>
                        </LazyLoadImage>
                        <span className="msk"></span>
                    </Link>
                </div>
                <p className="name">
                    <Link to={`/toplist/${id}`} className="s-fc0">
                        { name }
                    </Link>
                </p>
                <p className="s-fc4">
                    { updateFrequency }
                </p>
            </div>
        </li>
    )
}

const ListGroup = (props) => {
    const { title = '', list = [] } = props;
    return (
        <>
            <h2>{ title }</h2>
            <ul className="f-cb">
                {
                    list.map(item => {
                        return <ListItem key={item.id} {...item}  />
                    })
                }
            </ul>
        </>
    )
}

const AsideNav = (props) => {

    const { specialLists = {}, globalLists = {} } = props;
    const { pathname } =  useLocation();
    const tid = pathname.match(/toplist\/(.+)$/)[1];
    

    return (
        <aside className="g-sd3 g-sd3-1">
            <div className="n-minelst n-minelst-2">
                <ActiveId.Provider value={tid}>
                    <ListGroup  {...specialLists} />
                    <ListGroup  {...globalLists} />
                </ActiveId.Provider>
            </div>
        </aside>
    )
}

export default AsideNav;