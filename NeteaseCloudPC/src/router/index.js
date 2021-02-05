/* 
    路由配置
*/

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import AsyncComponent from '@/components/AsyncComponent';

const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));

const routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home}  />
            <Route path="/personal" exact component={Personal} />
        </Switch>
    </Router>
)

export default routes;