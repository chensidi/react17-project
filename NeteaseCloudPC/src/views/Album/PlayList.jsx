import AlbumTemp from '@/components/Album/AlbumTemp';
import withAlbumWrap from '@/components/Album/AlbumContent';
import albumApi from '@/api/album';

const getInfo = async (id) => {
   const res = await albumApi.getPlayListInfo(id);
   return res;
}

const getCmts = async (id, limit = 20, offset = 0) => {
    const res = await albumApi.getPlayListCmt(id, limit, offset);
    return res;
}

const fns = {
    getInfo,
    getCmts
}

const Page = withAlbumWrap(AlbumTemp, fns, 'playlist');

export default Page;