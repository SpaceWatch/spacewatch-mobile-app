enum Routes {
  BASE = "/",

  ALERTS_BASE = "/alerts",
  LIST_ALL_ALERTS = "/alerts/all",
  ALERTS_PAGE = "/alerts/:alertKey",
  ALERTS_PAGE_WITH_UNSUBSCRIBE = "/alertsPageWithUnsubscribe/:alertKey",
  ALERTS_SUBSCRIBE_PAGE = "/alerts/:alertKey/subscribe",

  SUBSCRIPTION_BASE = "/subscriptions",
  SUBSCRIPTION_LIST = "/subscriptions/all",

  WALLET_BASE = "/wallet",
  WALLET_AUTH = "/wallet/auth",
  WALLET_RECOVER = "/wallet/recover",
  WALLET_NEW = "/wallet/new",
}

export default Routes;
