import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

let cmtsDatas = {};

const withAlbumWrap = (Wrap, fns, flag) => {

    return function() {
        const {id} = useParams();

        const [albumInfo, changeInfo] = useState({}); //专辑/歌单介绍信息
        const [songs, changeSongs] = useState([]); //专辑/歌单歌曲内容
        const [cmtsData, changeCmtsData] = useState({ //评论内容
            total: 0,
            hotCmts: [],
            cmts: []
        });

        const getAlbumInfo = useCallback(() => { //获取信息
            fns.getInfo(id).then(res => {
                changeInfo(res.album);
                changeSongs(res.songs);
            })
        }, [])

        const getAlbumCmts = useCallback((id, limit = 20, offset = 0) => { //获取评论
            fns.getCmts(id, limit, offset).then(res => {
                let dataSet = offset > 0 ? {
                    ...cmtsDatas,
                    cmts: res.comments
                } : {
                    total: res.total,
                    hotCmts: res.hotComments,
                    cmts: res.comments
                }
                cmtsDatas = dataSet;
                changeCmtsData(dataSet);
            })
        }, [])

        const changeCmts = async (page, pageSize) => {
            await getAlbumCmts(id, 20, (page - 1) * pageSize);
        }

        const init = useCallback(() => { //初始化信息
            getAlbumInfo(id);
            getAlbumCmts(id);
        })

        useEffect(() => {
            document.body.scrollTop = 0;
            init();
        }, [])

        return <Wrap 
                    flag={flag} 
                    albumInfo={albumInfo}
                    songs={songs}
                    cmtsData={cmtsData}
                    changeCmts={changeCmts} 
                />
    }
}

export default withAlbumWrap;