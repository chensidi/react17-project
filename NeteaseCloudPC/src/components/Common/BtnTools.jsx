const BtnTools = (props) => {

    const { 
        shareCount = '', 
        commentCount = 0, 
        playHandler = () => {}, 
        addHandler = () => {} } = props;

    return (
        <div className="m-info">
            <div className="btns f-cb">
                <div className="u-btn2 u-btn2-2 u-btni-addply f-fl">
                    <i onClick={playHandler}>
                        <em className="ply"></em>
                        播放
                    </i>
                </div>
                <div className="u-btni u-btni-add" onClick={addHandler}></div>
                <div className="u-btni u-btni-fav">
                    <i>收藏</i>
                </div>
                <div className="u-btni u-btni-share">
                    <i>分享 { shareCount }</i>
                </div>
                <div className="u-btni u-btni-dl">
                    <i>下载</i>
                </div>
                <div className="u-btni u-btni-cmmt">
                    <i>评论 { commentCount }</i>
                </div>
            </div>
        </div>
    )
}

export default BtnTools;