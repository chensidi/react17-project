import { Link, useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useContext, createContext } from 'react';

const ActiveId = createContext();
const ListItem = (props) => {

    const activeId = Number(useContext(ActiveId));
    
    const { coverImgUrl = '', name = '', updateFrequency = '', id = 0 } = props;
    return (
        <li className={`mine ${activeId===id?'z-selected':''}`}>
            <Link className="item f-cb" to={`/home/toplist/${id}`}>
                <div className="left">
                    <span to={`/home/toplist/${id}`} className="avatar">
                        <LazyLoadImage width={40} height={40} src={coverImgUrl}>
                        </LazyLoadImage>
                        <span className="msk"></span>
                    </span>
                </div>
                <p className="name">
                    <span to={`/home/toplist/${id}`} className="s-fc0">
                        { name }
                    </span>
                </p>
                <p className="s-fc4">
                    { updateFrequency }
                </p>
            </Link>
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
    const tid = pathname.match(/toplist\/(.+)$/) && pathname.match(/toplist\/(.+)$/)[1];

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