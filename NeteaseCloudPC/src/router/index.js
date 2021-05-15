/* 
    路由配置
*/

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AsyncComponent from '@/components/AsyncComponent';
import generateFn from './generateRoute';
import routerTable from './routerTable';

const Home = AsyncComponent(() => import('@/views/Home/Home'));
const Personal = AsyncComponent(() => import('@/views/Personal/Personal'));


const routes = () => (
    <Router>
        <Switch>
            <Route exact path="/">
                <Redirect from="/" to="/home"  />
            </Route>
            {/*  <Route path="/home" exact render={() => <Home name="Home" />}>
            </Route> */}
            <Route path="/home">
                <Home name="Home">
                    {
                        <Route path="/home/abc/:id" component={Personal}></Route>
                    }
                </Home>
            </Route>
            <Route path="/personal" exact component={Personal} />
        </Switch>
    </Router>
)
const rt = generateFn(routerTable);
const routes2 = rt
// console.log(generateFn(routerTable))
export default routes2;