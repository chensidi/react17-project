import { Link } from 'react-router-dom';
import { Button } from 'antd';

export default function(props) {
    console.log(props)

    const { 
        picUrl, 
        name, 
        dj: {
            avatarUrl,
            nickname
        },
        category,
        desc 
    } = props

    return (
        <header className="m-info f-cb rdo-hd">
            <div className="cover u-cover u-cover-dj">
                <img src={`${picUrl}?param=200y200`} alt="" />
                <span className="msk"></span>
            </div>
            <div className="cnt">
                <div className="cntc">
                    <div className="hd f-cb">
                        <i className="f-fl u-icn u-icn-93"></i>
                        <div className="tit">
                            <h2 className="f-ff2">
                                { name }
                            </h2>
                        </div>
                    </div>
                    <div className="user f-cb">
                        <Link to="" className="face">
                            <img src={`${avatarUrl}?param=50y50`} alt="" />
                        </Link>
                        <span className="name">
                            <Link to="">
                                { nickname }
                            </Link>
                        </span>
                    </div>
                    <div className="btns f-cb j-flag">
                        <Button type="primary">订阅</Button>&nbsp;
                        <Button type="primary">播放全部</Button>&nbsp;
                        <Button type="primary">分享</Button>
                    </div>
                    <p className="intr f-brk">
                        <Link to="" className="cat cat u-type u-type-red">{category}</Link>
                        <span className="desc-dot">
                            { desc }
                        </span>
                    </p>
                </div>
            </div>
        </header>
    )
}