import { Route, Switch, NativeRouter } from "react-router-native";
import Routes from "./routes";
import AlertList from "./views/AlertList";
import Home from "./views/Home";
import WalletRecovery from "./views/WalletRecovery";
import WalletNew from "./views/WalletNew";
import React from "react";
import AlertPage from "./views/AlertPage";

const MainRouter = () => {

  return (
    <NativeRouter>
      <Switch>
        <Route path={Routes.BASE} exact>
          <Home />
        </Route>
        <Route path={Routes.LIST_ALL_ALERTS} exact>
          <AlertList />
        </Route>
        <Route path={Routes.WALLET_RECOVER} exact>
          <WalletRecovery />
        </Route>
        <Route path={Routes.WALLET_NEW} exact>
          <WalletNew />
        </Route>
        <Route path={Routes.ALERTS_PAGE} exact>
          <AlertPage />
        </Route>
      </Switch>
    </NativeRouter>
  );
};

export default MainRouter;
