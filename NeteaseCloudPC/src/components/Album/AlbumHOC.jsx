import { useParams } from 'react-router-dom';
import albumApi from '@/api/album';
import { useEffect, useState, useCallback,memo } from 'react';
import { playAlbum } from '@utils/utils'

const AlbumHOC = (AlbumComp, flag, fns) => {
    return (
        <AlbumUI 
            AlbumComp={AlbumComp} 
            flag={flag} 
            fns={fns}
        />
    )
}

let cmtsDatas = {};

const AlbumUI = memo(({AlbumComp, flag, fns}) => {
    const [albumInfo, changeInfo] = useState({});
    const [songs, changeSongs] = useState([]);
    const [cmtsData, changeCmtsData] = useState({
        total: 0,
        hotCmts: [],
        cmts: []
    });

    const getAlbumInfo = useCallback(() => { //获取信息
        fns.getInfo(id).then(res => {
            changeInfo(res.album);
            changeSongs(res.songs);
        })
    })

    const getAlbumCmts = useCallback((id, limit = 20, offset = 0) => {
        fns.getCmts(id, limit, offset).then(res => {
            console.log(res);
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
    })

    const changeCmts = async (page, pageSize) => {
        await getAlbumCmts(id, 20, (page - 1) * pageSize);
    }

    const playAlbumFn = useCallback(() => {
        playAlbum(id);
    })

    const init = useCallback(() => {
        getAlbumInfo(id);
        getAlbumCmts(id);
    })

    useEffect(() => {
        init();
    }, [])

    const {id} = useParams();

    return (
       <AlbumComp 
        flag={flag} 
        albumInfo={albumInfo}
        playAlbumFn={playAlbumFn}
        songs={songs}
        cmtsData={cmtsData}
        changeCmts={changeCmts}
       />
    )
})

export default AlbumHOC;