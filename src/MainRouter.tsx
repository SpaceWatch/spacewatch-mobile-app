import { Route, Switch, NativeRouter, useHistory } from "react-router-native";
import Routes from "./routes";
import AlertList from "./views/AlertList";
import Home from "./views/Home";
import WalletRecovery from "./views/WalletRecovery";
import WalletNew from "./views/WalletNew";
import React, { useEffect } from "react";
import AlertPage from "./views/AlertPage";
import * as SecureStore from 'expo-secure-store';
import AlertSubscribePage from "./views/AlertSubscribePage";

const MainRouter = () => {
  const history = useHistory();

  useEffect(() => {
    const handleRouting = async () => {
      const hasEncryptedPK = await SecureStore.getItemAsync("encryptedPK");
      if (hasEncryptedPK) {
        history.replace(Routes.LIST_ALL_ALERTS);
      } else {
        history.replace(Routes.BASE)
      }
    }
    handleRouting();
  }, [])

  return (
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
        <Route path={Routes.ALERTS_SUBSCRIBE_PAGE} exact>
          <AlertSubscribePage />
        </Route>
      </Switch>
  );
};

export default MainRouter;
