import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createRef } from 'react';
export const routerRef = createRef();

export const generateFn = (route, basePath="") => {
    return (
        <Router ref={routerRef}>
            <Switch>
                {
                    route.map(parentRoute => {
                        let realPath = '', redirectPath = '';
                        if (parentRoute.path.startsWith('/')) {
                            realPath = parentRoute.path;
                        } else {
                            realPath = basePath + '/' + parentRoute.path;
                        }
                        if (parentRoute.redirect) {
                            if (parentRoute.redirect.startsWith('/')) {
                                redirectPath = parentRoute.redirect;
                            } else {
                                redirectPath = basePath + '/' + parentRoute.redirect;
                            }
                        }
                        if (parentRoute.children) {
                            return (
                                <Route 
                                    path={realPath}
                                    key={parentRoute.name}
                                >
                                    <parentRoute.component>
                                    {
                                        generateFn(parentRoute.children, parentRoute.path)
                                    }
                                    </parentRoute.component>
                                </Route>
                            )
                        } else {
                            if (parentRoute.redirect) {
                                return (
                                    <Route exact path={realPath} key={parentRoute.name}>
                                        <Redirect to={redirectPath} />
                                    </Route>
                                )
                            } else {
                                return (
                                    <Route 
                                        path={realPath} 
                                        component={parentRoute.component} 
                                        key={parentRoute.name}
                                        exact
                                    />
                                )
                            }
                        }
                    })
                }
            </Switch>
        </Router>
    )
}


export default generateFn;