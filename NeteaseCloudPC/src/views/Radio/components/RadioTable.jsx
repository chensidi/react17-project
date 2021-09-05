import { UpSquareFilled, DownSquareFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { mediaTimeFormat, timeToYMD, playTimesFormat } from '@utils/utils';
import { ApiCtx } from '../RadioDetails';

function ProgramItem(props) {
    const { serialNum, name, listenerCount, likedCount, createTime, duration, idx } = props;

    return (
        <tr className={`j-tr ${idx%2&&'even'}`}>
            <td className="col1">
                <div className="hd">
                    <span className="ply"></span>
                    <span className="num">{ serialNum }</span>
                </div>
            </td>
            <td className="col2">
                <div className="tt f-thide">
                    <Link to="">{ name }</Link>
                </div>
                <div className="opt hshow">
                    <span className="u-icn u-icn-81 icn-add"></span>
                    <span className="icn icn-share"></span>
                    <span className="icn icn-dl"></span>
                </div>
            </td>
            <td className="col3">
                <span className="s-fc3">
                播放{ playTimesFormat(listenerCount) }
                </span>
            </td>
            <td className="col4">
                <span className="s-fc3">
                赞 { likedCount }
                </span>
            </td>
            <td className="col5">
                <span className="s-fc3">
                { timeToYMD(createTime) }
                </span>
            </td>
            <td className="f-pr">
                <span className="s-fc3">
                    { mediaTimeFormat(duration / 1000) }
                </span>
            </td>
        </tr> 
    )
}

export default function({list = [], total = 0}) {

    const { getProgram } = useContext(ApiCtx);

    const [sort, setSort] = useState(false); //默认降序

    const sortQuery = (flag) => {
        if (sort === flag) {
            return;
        }
        getProgram({asc: flag});
        setSort(flag);
    }

    return (
        <div className="n-songtb">
            <div className="u-title u-title-1 f-cb">
                <h3>
                    <span className="f-ff2">
                    节目列表
                    </span>
                </h3>
                <span className="sub s-fc4">
                    共{ total }期
                </span>
                <div className="u-sort f-fr f-cb">
                    <DownSquareFilled 
                        style={{fontSize:25}} 
                        onClick={() => sortQuery(false)} 
                        title="降序"
                    />
                    <UpSquareFilled 
                        style={{fontSize:25}} 
                        onClick={() => sortQuery(true)} 
                        title="升序"
                    />
                </div>
            </div>
            <table className="m-table m-table-program">
                <tbody>
                    {
                        list.length > 0 && list.map((item, i) => <ProgramItem key={item.id} {...item} idx={i} />)
                    }
                </tbody>
            </table>
        </div>
    )
}