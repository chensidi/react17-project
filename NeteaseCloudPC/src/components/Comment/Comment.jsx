import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function timeFormat(timeStamp) {
    const time = new Date(timeStamp);
    return time.getFullYear() + '年'
    + (time.getMonth() + 1) + '月'
    + time.getDate() + '日';
}

const Comment = (props) => {
    const { user, content, time, likedCount, beReplied } = props;
    return (
        <div className="itm">
            <div className="head">
                <Link to="">
                    <LazyLoadImage 
                        width={50} 
                        height={50} 
                        src={user.avatarUrl}
                        placeholderSrc="http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130"
                    >
                    </LazyLoadImage>
                </Link>
            </div>
            <div className="cntwrap">
                <div>
                    <div className="cnt f-brk">
                        <Link to="" className="s-fc7">{ user.nickname }</Link>
                        ：{ content }
                    </div>
                </div>
                {
                    beReplied.length ?
                    <div className="que f-brk f-pr s-fc3">
                        <Link to="" className="s-fc7">{ beReplied[0].user.nickname }</Link>
                        ：{ beReplied[0].content }
                    </div> : null
                }
                <div className="rp">
                    <div className="time s-fc4">{ timeFormat(time) }</div>
                    <span>
                        <i className="zan u-icn2 u-icn2-12"></i>
                        ({ likedCount })
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Comment;