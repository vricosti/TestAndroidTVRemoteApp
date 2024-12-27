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

# misc android
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
LOG  Entering App()
 LOG  handlePairingCodeSubmit:  6629CF
 LOG  androidRemote.sendCode(code):  6629CF
 DEBUG  Sending code :  6629CF
 DEBUG  client_certificate: {
  "serialNumber": "1B1DE31F47A57371344BCB8B51765E50B2B7C4F",
  "fingerprint512": "45:E5:54:8C:B0:83:0F:50:0F:02:36:A4:0F:82:97:51:4F:C2:BB:D3:4C:11:AE:8A:83:7E:67:C9:EC:B5:EB:9C:EE:CC:04:7B:00:E9:15:34:CE:A0:3A:99:67:D7:D4:8A:EB:30:2C:86:15:CC:76:9B:42:99:89:58:D9:75:7A:22",
  "fingerprint": "D5:A9:27:B6:B3:D3:3F:D5:F8:49:46:24:73:CD:91:7C:F1:83:DB:07",
  "valid_to": "Dec 27 21:09:40 2099 GMT",
  "pubkey": "MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAj2Jxa0awm1PQ1uQRHktIQytVYsLVODubzGEPVOIXHg+LF58KJ/LI7+ggGqsEb0mj5s7QvfW3Gim2rOG225TBHJ0wGDMHPykU8tNuKirmoej4oINNjL3s3mo1UaoNaG3oBd6lbb7aH4kHe2aVjDoLm3dOLPXm9uPD0fh8N8aUbRVxWDYdONvaqXX6VCjMi6IX+OZFzSNTnBm1n4DAui3Ccc6V1RvLCFQnVmy/TNve0TfRd622GtJEUWNAYeC8Wx6Ix3wAGvCbNirjIE6U4HnBnmqJS6yuER/qXNwb92tkwZmq2fACymO6i7SiqtGrJV0uLo61fpTwtLAhT55TjPAglr/YrzAa/Po0ZV7QMYDu/UkzQJgJRk2AoIC+OyvcSfbJrQfByU6iA3/OzWDrJBR3KmmNHqByUMg1pVLUrjgP1WVTntwhpoBiu4lTJBoqqnR19q6A+VGkmCNYr3uOxwzjSEB2YnKB+uQzwatsBmTwruDoro/bSCusuNAlJs6Hqr+VAgMBAAE=",
  "valid_from": "Dec 27 21:09:40 2021 GMT",
  "modulus": "8F62716B46B09B53D0D6E4111E4B48432B5562C2D5383B9BCC610F54E2171E0F8B179F0A27F2C8EFE8201AAB046F49A3E6CED0BDF5B71A29B6ACE1B6DB94C11C9D301833073F2914F2D36E2A2AE6A1E8F8A0834D8CBDECDE6A3551AA0D686DE805DEA56DBEDA1F89077B66958C3A0B9B774E2CF5E6F6E3C3D1F87C37C6946D157158361D38DBDAA975FA5428CC8BA217F8E645CD23539C19B59F80C0BA2DC271CE95D51BCB085427566CBF4CDBDED137D177ADB61AD24451634061E0BC5B1E88C77C001AF09B362AE3204E94E079C19E6A894BACAE111FEA5CDC1BF76B64C199AAD9F002CA63BA8BB4A2AAD1AB255D2E2E8EB57E94F0B4B0214F9E538CF02096BFD8AF301AFCFA34655ED03180EEFD4933409809464D80A080BE3B2BDC49F6C9AD07C1C94EA2037FCECD60EB2414772A698D1EA07250C835A552D4AE380FD565539EDC21A68062BB8953241A2AAA7475F6AE80F951A4982358AF7B8EC70CE3484076627281FAE433C1AB6C0664F0AEE0E8AE8FDB482BACB8D02526CE87AABF95",
  "fingerprint256": "22:2A:F9:60:AF:49:D0:AB:00:A1:E4:25:47:ED:7B:49:2F:D8:F0:A3:D7:E5:12:EC:C8:AE:17:EA:28:3E:79:52",
  "exponent": "0x10001",
  "ca": false,
  "bits": 3072,
  "issuer": {},
  "subject": {
    "CN": "com.lotalogic.lota-remotectl"
  }
}
 DEBUG  server_certificate: {
  "serialNumber": "1773AA71FED",
  "fingerprint512": "05:7A:9F:C0:AD:DB:B9:3F:C1:39:E5:05:2F:08:40:58:47:30:40:69:27:1F:16:C9:F6:01:5C:D4:8D:E6:46:09:F4:3C:35:B3:5E:C2:99:6D:01:3C:62:FB:0A:D9:40:5B:8A:73:77:03:6B:D0:03:FB:5C:A9:27:C8:38:57:64:3E",
  "fingerprint": "7B:4E:28:25:18:0E:F4:D5:B7:CD:62:11:4D:45:D3:14:BF:17:AE:2A",
  "valid_to": "Jan 19 03:14:07 2038 GMT",
  "pubkey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1hmo54HHzsk8i0+/hNax+zVtZR4WDP6F/3JXT1Y3YtYVP7HjW5THXSXvn+4iVPgOwwFrg5fFd2N6hnk5As56Ks2h+r/r3UzuHvMiYnkkpbW89b0VoAhY740wShkyxY0TJx/Ipj1YlU65oB6AxWWM78MAHIAtNJuB+/DFvKTpZoGj32Eq2lHyEhfnHCYUrkT27jkTp9TyWj6LIYkZFfcykgPKu90LDNqFtxrBCvA9d354TyrbZdBYbW3Ca4Vh0jpfuxDPzOyRnSGWi4IwFZdIuv0vLu1TMOyp3aFzIbR4L+EBvvNKoSwDWFPnVRnsUAP+50dCjk6/zSNu4Fou4EwikwIDAQAB",
  "valid_from": "Jan 25 11:00:00 2021 GMT",
  "modulus": "D619A8E781C7CEC93C8B4FBF84D6B1FB356D651E160CFE85FF72574F563762D6153FB1E35B94C75D25EF9FEE2254F80EC3016B8397C577637A86793902CE7A2ACDA1FABFEBDD4CEE1EF322627924A5B5BCF5BD15A00858EF8D304A1932C58D13271FC8A63D58954EB9A01E80C5658CEFC3001C802D349B81FBF0C5BCA4E96681A3DF612ADA51F21217E71C2614AE44F6EE3913A7D4F25A3E8B21891915F7329203CABBDD0B0CDA85B71AC10AF03D777E784F2ADB65D0586D6DC26B8561D23A5FBB10CFCCEC919D21968B8230159748BAFD2F2EED5330ECA9DDA17321B4782FE101BEF34AA12C035853E75519EC5003FEE747428E4EBFCD236EE05A2EE04C2293",
  "fingerprint256": "CE:B3:AC:15:18:76:EE:8C:A4:81:57:1E:6D:CE:A6:6B:B0:05:8D:E1:31:31:D8:C6:5B:F6:EC:00:53:C6:81:E6",
  "exponent": "0x10001",
  "ca": false,
  "bits": 2048,
  "issuer": {
    "dnQualifier": "-full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2",
    "CN": "atvremote/863600S191201703"
  },
  "subject": {
    "dnQualifier": "-full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2",
    "CN": "atvremote/863600S191201703"
  }
}
 LOG  PairingMessageManager.create
 LOG  PairingMessageManager.parse
 DEBUG  Receive : 42,8,2,16,200,1,202,2,34,10,32,102,178,37,198,190,255,189,250,81,14,87,227,164,208,255,148,117,243,210,124,103,79,209,168,83,156,166,58,218,141,57,198
 DEBUG  Receive : {"protocolVersion":2,"status":"STATUS_OK","pairingSecretAck":{"secret":"ZrIlxr7/vfpRDlfjpND/lHXz0nxnT9GoU5ymOtqNOcY="}}
 DEBUG  192.168.1.102 Paired!
 DEBUG  192.168.1.102 Pairing Connection closed undefined
 DEBUG  Start Remote Connect
 DEBUG  Remote connected
 DEBUG  192.168.1.102 Remote secureConnect
 DEBUG  192.168.1.102 Receive : {"remoteConfigure":{"code1":639,"deviceInfo":{"model":"Freebox Player Mini v2","vendor":"Freebox","unknown1":1,"unknown2":"7.1.1","packageName":"com.google.android.tv.remote.service","appVersion":"6.1.683155326"}}}
 DEBUG  Create Remote {"remoteConfigure":{"code1":622,"deviceInfo":{"model":"default-model","vendor":"default-manufacturer","unknown1":1,"unknown2":"1","packageName":"androidtv-remote","appVersion":"1.0.0"}}}
 DEBUG  Sending {"remoteConfigure":{"code1":622,"deviceInfo":{"model":"default-model","vendor":"default-manufacturer","unknown1":1,"unknown2":"1","packageName":"androidtv-remote","appVersion":"1.0.0"}}}
 LOG  Entering App()
 DEBUG  192.168.1.102 Receive : {"remoteSetActive":{}}
 DEBUG  Create Remote {"remoteSetActive":{"active":622}}
 DEBUG  Sending {"remoteSetActive":{"active":622}}
 DEBUG  192.168.1.102 Receive : {"remoteStart":{"started":true}}
 DEBUG  192.168.1.102 Receive : {"remoteSetVolumeLevel":{"unknown1":26,"unknown2":9,"playerModel":"Freebox Player Mini v2","unknown4":1}}
 DEBUG  192.168.1.102 Receive : {"remoteImeKeyInject":{"appInfo":{"appPackage":"com.google.android.leanbacklauncher"}}}
 DEBUG  Create Remote {"remoteKeyInject":{"keyCode":91,"direction":3}}
 DEBUG  Sending {"remoteKeyInject":{"keyCode":"KEYCODE_MUTE","direction":"SHORT"}}


