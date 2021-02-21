import { Component } from 'react';
import AsyncComponent from '@/components/AsyncComponent';
const Main = AsyncComponent(() => import('@/components/Main'));

class SearchPage extends Component {
    componentDidMount() {
        console.log(this.props.location.search.match(/kw=(.+)/));
    }
    render() {
        return (
            <Main>
                <div className="g-wrap n-srch">
                    <div className="pgsrch f-pr j-suggest">
                        <input type="text" className="srch j-flag"/>
                        <span className="btn j-flag" title="搜索"></span>
                    </div>
                    this is search page
                </div>
            </Main>
        )
    }
}

export default SearchPage;