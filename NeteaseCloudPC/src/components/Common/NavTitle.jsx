import { Fragment } from 'react';
import { Link } from 'react-router-dom';


export default (props) => {
    const { title = '标题', subs = [] } = props;

    return (
        <div className="v-hd2">
            <h2 to={title.path} className="tit f-ff2 f-tdn">{ title }</h2>
            <div className="tab">
                {
                    subs.map((item, i) => {
                        return (
                            <Fragment key={`${item.txt}${i}`}>
                                <Link to={item.path} className="s-fc3">
                                    { item.txt }
                                </Link>
                                {i < subs.length-1 ? <span className="line">|</span> : null}
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}