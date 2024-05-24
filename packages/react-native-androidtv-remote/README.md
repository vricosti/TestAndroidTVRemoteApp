# androidtv-remote

[![npm-version](https://badgen.net/npm/v/androidtv-remote)](https://www.npmjs.com/package/androidtv-remote)
[![npm-total-downloads](https://badgen.net/npm/dt/androidtv-remote)](https://www.npmjs.com/package/androidtv-remote)

[![Donate](https://badgen.net/badge/paypal/donate?icon=https://simpleicons.now.sh/paypal/fff)](https://www.paypal.com/donate/?hosted_button_id=B8NGNPFGK69BY)
[![Donate](https://badgen.net/badge/buymeacoffee/donate?icon=https://simpleicons.now.sh/buymeacoffee/fff)](https://www.buymeacoffee.com/louis49github)

# Installation

```
npm install androidtv-remote
```

# Usage

After first succeeded pairing, you can reuse generated certs with `getCertificate()` by sending it in constructor options.

```js
let host = "192.168.1.12";
let options = {
    pairing_port : 6467,
    remote_port : 6466,
    name : 'androidtv-remote',
    cert: {},
}

let androidRemote = new AndroidRemote(host, options)

androidRemote.on('secret', () => {
    line.question("Code : ", async (code) => {
        androidRemote.sendCode(code);
    });
});

androidRemote.on('powered', (powered) => {
    console.debug("Powered : " + powered)
});

androidRemote.on('volume', (volume) => {
    console.debug("Volume : " + volume.level + '/' + volume.maximum + " | Muted : " + volume.muted);
});

androidRemote.on('current_app', (current_app) => {
    console.debug("Current App : " + current_app);
});

androidRemote.on('ready', async () => {
    let cert = androidRemote.getCertificate();

    androidRemote.sendKey(RemoteKeyCode.MUTE, RemoteDirection.SHORT)

    androidRemote.sendAppLink("https://www.disneyplus.com");
});

let started = await androidRemote.start();
```
# Events

### `Event: secret`

Emitted when androidtv ask for code.

### `Event: powered`

Emitted when androidtv is powering on/off.

### `Event: volume`

Emitted when androidtv is changing volume/mute.

### `Event: current_app`

Emitted when androidtv is changing current app.

### `Event: error`

Emitted when androidtv has a problem : by example when you send a wrong app_link with `sendAppLink(app_link)`.

# Commands

### `Command: sendCode(code)`
- `code` : You need to pass the shown code on the TV when asked

### `Command: sendKey(KeyCode, Direction)`
- `KeyCode` : Any key of https://developer.android.com/reference/android/view/KeyEvent?hl=fr
- `Direction` : 
  * `START_LONG` : Start long push
  * `END_LONG` : Stop long push
  * `SHORT` : Simple push

### `Command : sendAppLink(app_link)`
- `app_link` : You can find them in some Android apps by seeking 'android:host' in Android-Manifest
  * You can use [jadx](https://github.com/skylot/jadx) to decompile the Android app and read Android-Manifest
  * Example : "https://www.netflix.com/title.*"

# Others

* If you need to decrypt some new messages from android TV, pass an Hexa form of buffer here : https://protogen.marcgravell.com/decode
* You can take a look at my other package for homebridge that use this current one: [homebridge-plugin-androidtv](https://github.com/louis49/homebridge-plugin-androidtv)

# License

MIT

# misc
PairingManager.start:  {
  key: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
    ...
    '-----END RSA PRIVATE KEY-----\r\n',
  cert: '-----BEGIN CERTIFICATE-----\r\n' +
    ...
    '-----END CERTIFICATE-----\r\n',
  port: 6467,
  host: '192.168.1.102',
  rejectUnauthorized: false
}
Start Pairing Connect
192.168.1.102 Pairing connected
192.168.1.102 Pairing secure connected 
Receive : 7,8,2,16,200,1,90,0
Receive : {"protocolVersion":2,"status":"STATUS_OK","pairingRequestAck":{}}
Receive : 16,8,2,16,200,1,162,1,8,18,4,8,3,16,6,24,1
Receive : {"protocolVersion":2,"status":"STATUS_OK","pairingOption":{"outputEncodings":[{"type":"ENCODING_TYPE_HEXADECIMAL","symbolLength":6}],"preferredRole":"ROLE_TYPE_INPUT"}}
Receive : 8,8,2,16,200,1,250,1,0
Receive : {"protocolVersion":2,"status":"STATUS_OK","pairingConfigurationAck":{}}
Code : 3CADA5
Sending code :  3CADA5
Receive : 42,8,2,16,200,1,202,2,34,10,32,60,12,224,82,205,111,147,194,35,197,122,187,213,226,206,186,253,43,136,33,239,71,58,23,138,148,52,58,232,69,156,179
Receive : {"protocolVersion":2,"status":"STATUS_OK","pairingSecretAck":{"secret":"PAzgUs1vk8IjxXq71eLOuv0riCHvRzoXipQ0OuhFnLM="}}
192.168.1.102 Paired!
192.168.1.102 Pairing Connection closed false
RemoteManager.start:  {
  key: '-----BEGIN RSA PRIVATE KEY-----\r\n' +
    ...
    '-----END RSA PRIVATE KEY-----\r\n',
  cert: '-----BEGIN CERTIFICATE-----\r\n' +
    ...
    '-----END CERTIFICATE-----\r\n',
  port: 6466,
  host: '192.168.1.102',
  rejectUnauthorized: false
}
192.168.1.102 Remote secureConnect
after androidRemote.start()
192.168.1.102 Receive : {"remoteConfigure":{"code1":639,"deviceInfo":{"model":"Freebox Player Mini v2","vendor":"Freebox","unknown1":1,"unknown2":"7.1.1","packageName":"com.google.android.tv.remote.service","appVersion":"5.2.473254133"}}}
Create Remote {"remoteConfigure":{"code1":622,"deviceInfo":{"model":"Z490 VISION D","vendor":"Gigabyte Technology Co., Ltd.","unknown1":1,"unknown2":"1","packageName":"androidtv-remote","appVersion":"1.0.0"}}}
Sending {"remoteConfigure":{"code1":622,"deviceInfo":{"model":"Z490 VISION D","vendor":"Gigabyte Technology Co., Ltd.","unknown1":1,"unknown2":"1","packageName":"androidtv-remote","appVersion":"1.0.0"}}}


