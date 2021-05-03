import { API, HAP, AccessoryConfig, Service } from 'homebridge';
import { HAPNodeJSClient } from 'hap-node-client';
import { LockToSwitch } from './accessories/lock-to-switch';
import { Kit } from './types/common';

let hap: HAP;

export = (api: API) => {
  hap = api.hap;
  api.registerAccessory('HBConverter', HBConverter);
};

class HBConverter {
  private readonly config: AccessoryConfig;
  private readonly api: API;
  private readonly Service;
  private readonly Characteristic;

  private readonly informationService: Service;
  private readonly service: Service;

  private readonly client: HAPNodeJSClient;

  /**
   * REQUIRED - This is the entry point to your plugin
   */
  constructor(log, config, api) {
    this.config = config;
    this.api = api;

    this.Service = this.api.hap.Service;
    this.Characteristic = this.api.hap.Characteristic;

    this.informationService = new this.Service.AccessoryInformation()
      .setCharacteristic(this.Characteristic.Manufacturer, 'nzws.me')
      .setCharacteristic(this.Characteristic.Model, 'HBConverter')
      .setCharacteristic(this.Characteristic.SerialNumber, 'ho-me-br-id-ge');

    this.client = new HAPNodeJSClient({
      pin: this.config.pin,
    });

    const kit: Kit = {
      hap,
      log,
      config,
      api,
      client: this.client,
      Service: this.Service,
      Characteristic: this.Characteristic,
    };

    switch (config.type) {
      case 'lock':
        this.service = LockToSwitch(kit);
        break;
      default:
        throw new Error('unknown type');
    }
  }

  /**
   * REQUIRED - This must return an array of the services you want to expose.
   * This method must be named "getServices".
   */
  getServices() {
    return [this.informationService, this.service];
  }
}
