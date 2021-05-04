import {Route, Switch, NativeRouter} from 'react-router-native';
import Routes from "./routes";
import WatcherList from './views/WatcherList';
import Home from "./views/Home";
import React from 'react';


const MainRouter = () => {
    return (
        <NativeRouter>
            <>
            <Switch>
                <Route path={Routes.HOME}>
                    <Home />
                </Route>
                <Route path={Routes.LIST_ALL_WATCHERS}>
                    <WatcherList />
                </Route>
            </Switch>
                </>
        </NativeRouter>
    );
};

export default MainRouter;
