/**
 * Move asteroid protocol specific code to asteroid.js
 */

/**
 * Please sort this in alphabatical order so that others can find duplicates if any exist
 */
export enum WatcherKey {
  TERRA__ANCHOR__LTV_RATIO = "TERRA__ANCHOR__IS_HIGH_LTV"
};

export type WatcherFieldKey = string;

export interface WatcherConfig {
  key: WatcherKey; // Formatted as `blockchain.protocol.method`
  blockchain: string; // eg. `terra`
  protocol: string; // eg. `anchor`, use keyword `base` for base layer queries
  method: string; // eg. `isHighLtv`

  // Alert me when: Anchor LTV is too high
  name: string;
  // eg. Send an alert when my Anchor LTV is above x%
  description: string;

  fields: WatcherField[];
}

// We store all fields as strings, even integers and floats
export interface WatcherField {
  key: WatcherFieldKey; // Should be unique among other fields belonging to the same `blockchain.protocol.method` watcher
  name: string;
  description: string;
  validationRegex: string; // Regex string
}


export interface WatcherSubscription {
  // watcherAddress: string;
  watcherConfig: WatcherConfig;
  fieldValuesByKey: Record<WatcherFieldKey, FieldValue>;
}

export interface FieldValue extends WatcherField {
  key: WatcherFieldKey;
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
