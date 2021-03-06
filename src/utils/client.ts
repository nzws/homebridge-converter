import { CharacteristicResponse, CharacteristicValue } from 'hap-node-client';
import { Kit } from '../types/common';

export const getStatus = (kit: Kit, aid: number, iid: number): Promise<CharacteristicResponse | undefined> =>
  new Promise((resolve, reject) => {
    kit.log.debug('getStatus', aid, iid);
    kit.client.HAPstatus('127.0.0.1', kit.config.port, `?id=${aid}.${iid}`, (err, response) => {
      if (err) {
        return reject(err);
      }

      kit.log.debug('getStatus result', response);
      resolve(response.characteristics[0]);
    });
  });

export const runControl = (kit: Kit, aid: number, iid: number, data: CharacteristicValue): Promise<undefined> =>
  new Promise((resolve, reject) => {
    kit.log.debug('runControl', aid, iid, data);
    kit.client.HAPcontrol('127.0.0.1', kit.config.port, JSON.stringify({ characteristics: [ { aid, iid, ...data } ] }), (err) => {
      if (err) {
        return reject(err);
      }

      resolve(undefined);
    });
  });

export const registerEvent = (kit: Kit, aid: number, iid: number): void => {
  kit.log.debug('registerEvent', aid, iid);
  kit.client.HAPevent('127.0.0.1', kit.config.port, JSON.stringify({ characteristics: [ { aid, iid, ev: true } ] }), (err) => {
    if (err) {
      kit.log.error('registerEvent error', err);
    }
  });
};
