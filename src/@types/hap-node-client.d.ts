declare module 'hap-node-client' {
  export interface initializeConfig {
    debug?: boolean;
    pin?: string;
    refresh?: number;
    timeout?: number;
    reqTimeout?: number;
  }

  type Todo = unknown;

  export interface CharacteristicValue {
    value: number;
  }

  export interface Characteristic extends CharacteristicValue {
    type: string;
    iid: number;
    perms: Todo;
    description: string;
    format: string;
    unit?: string;
    minValue?: number;
    maxValue?: number;
    minStep?: number;
    maxLen?: number;
  }

  export interface Service {
    type: string;
    iid: number;
    characteristics: Characteristic[];
  }

  export interface Accessory {
    aid: number;
    services: Service[];
  }

  export interface Device {
    ipAddress: string;
    instance: {
      host: string;
      port: number;
      url: string;
      deviceId: string;
      txt: Todo;
    };
    deviceId: string;
    name: string;
    accessories: {
      accessories: Accessory[];
    };
  }

  export interface CharacteristicResponse extends CharacteristicValue {
    aid: number;
    iid: number;
  }

  type GetDataCb = (err: Error | null, result: {
    characteristics: CharacteristicResponse[];
  }) => unknown;
  type GetDataByIP = (ipAddress: string, port: number, body: string, cb?: GetDataCb) => void;
  type GetDataByDeviceId = (deviceId: string, body: string, cb?: GetDataCb) => void;

  type SetDataCb = (err: Error | null) => unknown;
  type SetDataByIP = (ipAddress: string, port: number, body: string, cb?: SetDataCb) => void;
  type SetDataByDeviceId = (deviceId: string, body: string, cb?: SetDataCb) => void;

  export type HAPEvent = CharacteristicResponse & {
    host: string;
    port: number;
    deviceId: string;
  };

  export class HAPNodeJSClient {
    constructor(initializeConfig);

    HAPaccessories(cb: (devices: Device[]) => unknown): void;

    // bodyは '?id=25.11,25.12'
    HAPstatus: GetDataByIP;

    // bodyは JSON.stringify({ characteristics: [ { aid: 25, iid: 11, value: 0 } ] })
    HAPcontrol: SetDataByIP;

    // Characteristicを指定するとhapEventでlistenされる
    // bodyは JSON.stringify({ characteristics: [ { aid: 25, iid: 11, ev: true } ] })
    HAPevent: SetDataByIP;

    HAPstatusByDeviceID: GetDataByDeviceId;
    HAPcontrolByDeviceID: SetDataByDeviceId;
    HAPeventByDeviceID: SetDataByDeviceId;

    on(event: 'Ready', listener: () => unknown): this;
    on(event: 'hapEvent', listener: (event: HAPEvent[]) => unknown): this;
    on(event: string, listener: unknown): this;

    once(event: 'Ready', listener: () => unknown): this;
    once(event: 'hapEvent', listener: (event: HAPEvent[]) => unknown): this;
    once(event: string, listener: unknown): this;
  }
}
