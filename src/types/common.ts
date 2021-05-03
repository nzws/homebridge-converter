import { HAPNodeJSClient } from 'hap-node-client';
import { AccessoryConfig, API, HAP, Logger, Service } from 'homebridge';

export interface Kit {
  hap: HAP;
  log: Logger;
  config: AccessoryConfig;
  api: API;
  client: HAPNodeJSClient;
  Service: HAP['Service'];
  Characteristic: HAP['Characteristic'];
}

export type ConvertAccessory = (kit: Kit) => Service;
