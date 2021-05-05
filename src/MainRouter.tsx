import { Route, Switch, NativeRouter } from "react-router-native";
import Routes from "./routes";
import AlertList from "./views/AlertList";
import Home from "./views/Home";
import WalletRecovery from "./views/WalletRecovery";
import React from "react";

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
      </Switch>
    </NativeRouter>
  );
};

export default MainRouter;
