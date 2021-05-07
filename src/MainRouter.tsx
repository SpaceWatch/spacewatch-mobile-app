import { Route, Switch, NativeRouter, useHistory } from "react-router-native";
import Routes from "./routes";
import AlertList from "./views/AlertList";
import Home from "./views/Home";
import WalletAuth from "./views/WalletAuth";
import WalletRecovery from "./views/WalletRecovery";
import WalletNew from "./views/WalletNew";
import React, { useEffect } from "react";
import AlertPage from "./views/AlertPage";
import * as SecureStore from 'expo-secure-store';
import AlertSubscribePage from "./views/AlertSubscribePage";
import SubscriptionList from "./views/SubscriptionList";
import AlertPageWithUnSubscribe from "./views/AlertPageWithUnsubscribeButton";

const MainRouter = () => {
  const history = useHistory();

  useEffect(() => {
    const handleRouting = async () => {
      const hasEncryptedPK = await SecureStore.getItemAsync("encryptedPK");
      if (hasEncryptedPK) {
        history.replace(Routes.WALLET_AUTH);
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
        <Route path={Routes.WALLET_AUTH} exact>
          <WalletAuth />
        </Route>
        <Route path={Routes.WALLET_RECOVER} exact>
          <WalletRecovery />
        </Route>
        <Route path={Routes.WALLET_NEW} exact>
          <WalletNew />
        </Route>
          <Route path={Routes.ALERTS_SUBSCRIBE_PAGE}>
              <AlertSubscribePage />
          </Route>
        <Route path={Routes.ALERTS_PAGE}>
          <AlertPage />
        </Route>
      <Route path={Routes.SUBSCRIPTION_LIST} exact>
          <SubscriptionList />
      </Route>
          <Route path={Routes.ALERTS_PAGE_WITH_UNSUBSCRIBE} exact>
              <AlertPageWithUnSubscribe/>
          </Route>
      </Switch>
  );
};

export default MainRouter;
