import Main from '@components/Main';
import Category from './components/Category';
import Recommend from './components/Recommend';

export default () => {
    return (
        <Main className="g-wrap">
            <Category />
            <Recommend />
        </Main>
    )
}