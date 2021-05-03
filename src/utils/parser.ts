import { Accessory, Characteristic, Device } from 'hap-node-client';
import { Kit } from '../types/common';

export const getInstances = (kit: Kit): Promise<Device[]> => new Promise(resolve => kit.client.HAPaccessories(resolve));

export const getAccessory = async (kit: Kit, aid: number): Promise<Accessory> => {
  const instance = (await getInstances(kit)).find(instance => instance.instance.port === kit.config.port);
  if (!instance) {
    throw kit.log.error('instance not found', aid);
  }

  const accessory = instance.accessories.accessories.find(acc => acc.aid === aid);
  if (!accessory) {
    throw kit.log.error('accessory not found', aid);
  }

  return accessory;
};

export const getCharacteristic = (kit: Kit, accessory: Accessory, type: string): Characteristic => {
  const service = accessory.services.find(service => service.characteristics.find(char => char.type === type));
  if (!service) {
    throw kit.log.error('service not found', type);
  }

  const characteristic = service.characteristics.find(char => char.type === type);
  if (!characteristic) {
    throw kit.log.error('characteristic not found', type);
  }

  return characteristic;
};
