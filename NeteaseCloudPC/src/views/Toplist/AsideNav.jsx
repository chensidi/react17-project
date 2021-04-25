import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ListItem = (props) => {
    const { coverImgUrl = '', name = '', updateFrequency = '' } = props;
    return (
        <li className="mine">
            <div className="item f-cb">
                <div className="left">
                    <Link to="" className="avatar">
                        <LazyLoadImage width={40} height={40} src={coverImgUrl}>
                        </LazyLoadImage>
                        <span className="msk"></span>
                    </Link>
                </div>
                <p className="name">
                    <Link to="" className="s-fc0">
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

    return (
        <aside className="g-sd3 g-sd3-1">
            <div className="n-minelst n-minelst-2">
                <ListGroup {...specialLists} />
                <ListGroup {...globalLists} />
            </div>
        </aside>
    )
}

export default AsideNav;