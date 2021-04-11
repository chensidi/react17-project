import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pagination, message } from 'antd';
import { useState, useCallback } from 'react';

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
                    <div className="cnt f-brk nf">
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

export const CommentWrap = (props) => {
    const { total, hotCmts, cmts, onChange } = props;
    const [curPage, changePage] = useState(1);

    const pageChange = useCallback(async (page, pageSize) => {
        changePage(page);
        message.loading({ 
            content: '获取评论中...', 
            key: 'loadCmt', 
            duration: 0 ,
            style: {
                marginTop: '40vh',
            },
        });
        await onChange(page, pageSize);
        message.destroy('loadCmt')
    }, [])
    return (
        <div className="n-cmt">
            <div>
                <div className="u-title u-title-1">
                    <h3>
                        <span className="f-ff2">
                        评论
                        </span>
                    </h3>
                    <span className="sub s-fc3">共{ total }条评论</span>
                </div>
                <div className="m-cmmt">
                    <div className="cmmts j-flag">
                        {
                            hotCmts.length > 0 ?
                            <>
                            <div className="u-hd4">
                                精彩评论
                            </div>
                            {
                                hotCmts.map(cmt => {
                                    return (
                                        <Comment key={cmt.commentId} {...cmt} />
                                    )
                                })
                            }
                            </>
                            : null
                        }
                        <br/>
                        <br/>
                        {
                            cmts.length > 0 ?
                            <>
                                <div className="u-hd4">
                                    最新评论
                                </div>
                                {
                                    cmts.map(cmt => {
                                        return (
                                            <Comment key={cmt.commentId} {...cmt} />
                                        )
                                    })
                                }
                            </>
                            : null
                        }
                    </div>
                    {
                        cmts.length > 0 ?
                        <div className="pagination-wrap">
                            <Pagination 
                                defaultCurrent={1} 
                                total={total} 
                                pageSize={20} 
                                showSizeChanger={false}
                                current={curPage}
                                onChange={pageChange}
                            />
                        </div>: null
                    }
                </div>
            </div>
        </div>
    )
}

export default Comment;