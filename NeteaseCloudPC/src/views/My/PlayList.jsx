import BtnTools from '@/components/Common/BtnTools'


const PlayList = () => {
    return (
        <div>
            <div className="g-wrap my-createplaylist f-cb">
                <img className="cover" src="https://p1.music.126.net/7PCudfmGJnrMInRXo2KlkQ==/109951165445099479.jpg?param=200y200" alt="" />
                <div className="playlist-info">
                    <div className="hd">
                        <i className="type u-icn u-icn-13"></i>
                        <h2 className="f-ff2 f-thide">
                            我喜欢的音乐
                        </h2>
                    </div>
                    <div className="con">
                        <img className="head" src="http://p1.music.126.net/olGP09cp3ff_lz8_V5BTcQ==/109951163621192435.jpg?param=200y200" alt="" />
                        <em className="creator-name">有个人走过1999</em>
                        <time>2017-07-07 创建</time>
                    </div>
                    <BtnTools />
                </div>
            </div>
        </div>
    )
}

export default PlayList;