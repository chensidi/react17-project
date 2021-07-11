import { Link } from 'react-router-dom';

import { timeToYMD, artistsFormat } from '@/utils/utils';
import { parseJson } from '@/utils/pureFunctions';

export const EventWrap = (props) => {
    return (
        <ul className="m-dlist j-flag">
            { props.children }
        </ul>
    )
}

export const EventItem = ({info} = {}) => {
    const jsonObj = JSON.parse(info.json)

    function shareType() {
        if (jsonObj.song) {
            return '分享单曲';
        } else if (jsonObj.program) {
            return '分享节目';
        } else {
            return '';
        }
    }

    return (
        <li className="itm">
            <div className="gface">
                <Link to="">
                    <img src={`${info?.user?.avatarUrl}?param=45y45}`} alt="" />
                </Link>
            </div>
            <div className="gcnt j-flag">
                <div className="type f-pr f-fs1">
                    <Link to="" className="s-fc7">{ info?.user?.nickname }</Link>
                    <span className="sep s-fc3">{ shareType() }</span>
                </div>
                <p className="time s-fc4">
                    {timeToYMD(info?.showTime)}
                </p>
                <div className="text f-fs1  f-brk j-text">
                    { parseJson(info?.json, 'msg') }
                </div>
                {
                    parseJson(info?.json, 'song') ?? parseJson(info?.json, 'program') ? 
                    <div className="src f-cb">
                        <div className="cover cover-ply">
                            <img src={parseJson(info?.json, 'song.img80x80') ?? parseJson(info?.json, 'song.album.picUrl') ?? parseJson(info?.json, 'program.img80x80')} alt="" />
                            <Link className="ply u-dicn u-dicn-8 f-alpha" to=""></Link>
                        </div>
                        <div className="scnt">
                            <h3 className="tit f-thide f-fs1">
                                <Link className="s-fc1" to="">
                                    { parseJson(info?.json, 'song.name') ??  parseJson(info?.json, 'program.name')}
                                </Link>
                            </h3>
                            <h4 className="from f-thide s-fc3">
                                {
                                    parseJson(info?.json, 'program.radio.category') ?
                                    <span className="channel">{ parseJson(info?.json, 'program.radio.category') }</span>
                                    : null
                                }
                                <Link className="s-fc3">{ artistsFormat(parseJson(info?.json, 'song.artists') ?? []) || parseJson(info?.json, 'program.radio.name') }</Link>
                            </h4>
                        </div>
                    </div> : null
                }
                <ul className="pics f-cb j-flag">
                    {
                        info?.pics?.map(pic => {
                            return (
                                <li className="pic pic-s" key={pic.squareUrl}>
                                    <img src={pic.squareUrl} alt="" />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </li>
    )
}