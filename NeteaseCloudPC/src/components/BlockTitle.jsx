import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BlockTitle = (props) => {
    const { title, subs = [] } = props;
    return (
        <div className="v-hd2">
            <Link to={title.path} className="tit f-ff2 f-tdn">{ title.txt }</Link>
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
            <span className="more">
                <a href="/#" className="s-fc3">更多</a>
                <i className="cor s-bg s-bg-6">&nbsp;</i>
            </span>
        </div>
    )
}   

export default BlockTitle;