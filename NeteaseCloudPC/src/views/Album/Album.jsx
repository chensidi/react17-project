import AlbumHOC from '@/components/Album/AlbumHOC';
import AlbumTemp from '@/components/Album/AlbumTemp';
import albumApi from '@/api/album';

const getInfo = async (id) => {
   const res = await albumApi.getAlbumInfo(id);
   return res;
}

const getCmts = async (id, limit = 20, offset = 0) => {
    const res = await albumApi.getAlbumCmt(id, limit, offset);
    return res;
}

const fns = {
    getInfo,
    getCmts
}

const page = AlbumHOC(AlbumTemp, 'album', fns);

const Album = () => {
    return page;
}


export default Album;