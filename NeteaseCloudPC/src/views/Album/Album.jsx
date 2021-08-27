import AlbumTemp from '@/components/Album/AlbumTemp';
import withAlbumWrap from '@/components/Album/AlbumContent';
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

const Page = withAlbumWrap(AlbumTemp, fns, 'album');

export default Page;