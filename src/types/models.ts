/**
 * Move asteroid protocol specific code to asteroid.js
 */

/**
 * Please sort this in alphabatical order so that others can find duplicates if any exist
 */
export enum AlertKey {
  TERRA__ANCHOR__LTV_RATIO = "TERRA__ANCHOR__IS_HIGH_LTV"
};

export type AlertFieldKey = string;

export interface AlertConfig {
  key: AlertKey; // Formatted as `blockchain.protocol.method`
  blockchain: string; // eg. `terra`
  protocol: string; // eg. `anchor`, use keyword `base` for base layer queries
  method: string; // eg. `isHighLtv`

  // Alert me when: Anchor LTV is too high
  name: string;
  // eg. Send an alert when my Anchor LTV is above x%
  description: string;

  fields: AlertField[];
}

// We store all fields as strings, even integers and floats
export interface AlertField {
  key: AlertFieldKey; // Should be unique among other fields belonging to the same `blockchain.protocol.method` watcher
  name: string;
  description: string;
  validationRegex: string; // Regex string
}


export interface Subscription {
  // watcherAddress: string;
  alertConfig: AlertConfig;
  fieldValuesByKey: Record<AlertFieldKey, AlertFieldValue>;
}

export interface AlertFieldValue extends AlertField {
  key: AlertFieldKey;
  name: string;
  description: string;
  validationRegex: string; // Regex string
  value: string; // We store all values as strings, even integers and floats
}

// Configuration for the alert message to show to the user
export interface NotificationConfig {
  title: string;
  body: string;
  // data?: any; // Pass arbitrary data to the app? Not sure if we want this yet
}
