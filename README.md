# @nzws/homebridge-converter

> Homebridge Plugin that convert accessories for integration with other home systems.  
> 他のホームシステムに連携するためにアクセサリを変換するプラグイン

## Features

- Lock accessory → Switch accessory
  - google home / alexa などでロックアクセサリは円滑な操作ができないため
- ...(todo)

## Install

```
npm install --global @nzws/homebridge-converter
```

- HomebridgeインスタンスはInsecureモードで起動する必要があります

## Config

```json
{
  "accessory": "HBConverter",
  "name": "Room Lock",
  "pin": "031-45-154",
  "port": 51239,
  "aid": 25,
  "type": "lock"
}
```

- `pin`: Homebridge Pin code
- `port`: Homebridge Instance Port
- `aid`: Accessory aid
- `type`: Accessory Type
  - `lock`: Lock → Switch
