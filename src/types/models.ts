export type BlueprintKey = string;

export interface AsteroidBlueprint {
  blueprintKey: BlueprintKey; // Formatted as `blockchain.protocol.blueprint`
  name: string;
  description: string;
  fields: BlueprintField[]
}

// We store all fields as strings, even integers and floats
export interface BlueprintField {
  key: FieldKey; // Should be unique among all the fields
  name: string;
  description: string;
  validationRegex: string; // Regex string
}


export type FieldKey = string;
export type TemplateString = string;


export interface AsteroidWatcher {
  walletAddress: string;
  blueprint: AsteroidBlueprint;
  fieldValuesByKey: Record<FieldKey, FieldValue>;
}

export interface FieldValue {
  key: FieldKey;
  value: TemplateString;
}

// Configuration for the alert message to show to the user
export interface NotificationConfig {
  title: string;
  body: string;
  data?: any; // Pass arbitrary data to the app? Not sure if we want this yet
}
