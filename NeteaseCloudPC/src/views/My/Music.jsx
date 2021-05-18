import Main from '@/components/Main';
import { MyMenu } from './components/menu/Menu';

const MyMusic = () => {

    return (
        <Main>
           <MyMenu />
           <div className="m-right">
               我的歌单
           </div>
        </Main>
    )
}

export default MyMusic;