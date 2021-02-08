/* 
    路由配置
*/

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '@/components/AsyncComponent';

const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));

const routes = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect from="/" to="/home"  />
            </Route>
            <Route path="/home" exact render={() => <Home name="Home" />}  />
            <Route path="/personal" exact component={Personal} />
        </Switch>
    </Router>
)

export default routes;