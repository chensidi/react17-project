import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const cateList = [
    '推荐',
    '华语',
    '欧美',
    '日本',
    '韩国',
    '其他'
];

const CateGroup = (props) => {
    const { title = '', list = [], idx } = props;
    const { pathname } = useLocation()
    
    return (
        <div className={`${idx > 0 ? 'blk': ''}`}>
            <h2 className="tit">{ title }</h2>
            <ul className="nav f-cb">
                {
                    list.map(cate => {
                        return (
                            <li key={cate.cate}>
                                <Link className={`${pathname === cate.path ? 'z-slt' : 'cat-flag'}`} to={cate.path}>{ cate.cate }</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const CateAside = () => {

    // const [asideCates, setCates] = useState([]);

    const asideConvert = () => {
        let newCate = [];
        cateList.map((item, i) => {
            let cateObj;
            if (i === 0) {
                cateObj = {
                    title: item,
                    list: [
                        {
                            cate: '推荐歌手',
                            path: '/home/singer/cate/recommend'
                        },
                        {
                            cate: '热门歌手',
                            path: '/home/singer/cate/hot'
                        }
                    ]
                }
            } else {
                cateObj = {
                    title: item,
                    list: []
                };
                ['男歌手', '女歌手', '组合/其他'].map(cate => {
                    cateObj.list.push({
                        cate: `${item}${cate}`
                    })
                })
            }

            newCate.push(cateObj);
        })

        return newCate;
    }

    const asideCates = useMemo(() => asideConvert(), [])

    // useEffect(() => {
    //     const res = asideConvert();
    //     setCates(res);
    // }, [])

    return (
        <div className="g-sd2">
            <div className="g-wrap4 n-sgernav">
                {
                    asideCates.map((item, i) => {
                        return (
                            <CateGroup {...item} idx={i} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CateAside;