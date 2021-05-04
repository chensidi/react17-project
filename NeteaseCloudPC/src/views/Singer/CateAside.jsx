import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const cateList = [
    {name: '推荐', val: '-1'},
    {name: '华语', val: 7},
    {name: '欧美', val: 96},
    {name: '日本', val: 8},
    {name: '韩国', val: 16},
    {name: '其他', val: 0}
];

export const typeList = ['男歌手', '女歌手', '组合/其他'];

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
                    title: item.name,
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
                    title: item.name,
                    list: []
                };
                ['男歌手', '女歌手', '组合/其他'].map((cate, i) => {
                    cateObj.list.push({
                        cate: `${item.name}${cate}`,
                        path: `/home/singer/cate/${item.val}/${i+1}`
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