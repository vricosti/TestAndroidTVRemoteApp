import forge from "node-forge"
import * as jsEnv from "../utils/utils.js";

export class CertificateGenerator {

    static async generateFull(name, country, state, locality, organisation, OU){

        if (jsEnv.isReactNative) {
            console.log('react-native detected => patch to use react-native-modpow');

            const modPowModule = await import('react-native-modpow');
            const modPow = modPowModule.default;

            forge.jsbn.BigInteger.prototype.modPow = function nativeModPow(e, m) {
                const result = modPow({
                    target: this.toString(16),
                    value: e.toString(16),
                    modifier: m.toString(16)
                });
        
                return new forge.jsbn.BigInteger(result, 16);
            };
        }

        console.log('Entering generateFull');
        let keys = forge.pki.rsa.generateKeyPair(2048);
        console.log('after generateKeyPair with keys: ', keys);
        let cert = forge.pki.createCertificate();
        console.log('after createCertificate with cert: ', cert);
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01' + forge.util.bytesToHex(forge.random.getBytesSync(19));
        cert.validity.notBefore = new Date();
        let date = new Date();
        date.setUTCFullYear(2099);
        cert.validity.notAfter = date;

        let attributes = [
            {name: 'commonName', value: name},
            {name: 'countryName', value: country},
            {shortName: 'ST', value: state},
            {name: 'localityName', value: locality},
            {name: 'organizationName', value: organisation},
            {shortName: 'OU', value: OU}
        ];
        cert.setSubject(attributes);
        cert.sign(keys.privateKey, forge.md.sha256.create());

        return {
            cert : forge.pki.certificateToPem(cert),
            key : forge.pki.privateKeyToPem(keys.privateKey),
        }
        
        // Stil does not work so try with a self-signed cert generated with openssl
        // openssl req -newkey rsa:2048 -nodes -x509 -days 36500 -nodes -keyout client-selfsigned.key -out client-selfsigned.crt
        // copy them inside client-selfsigned.crt and client-selfsigned.key and inside android/app/src/main/res/raw
        // and add android/app/src/main/res/xml/network_security_config.xml

//         const cert = `-----BEGIN CERTIFICATE-----
// MIIDuzCCAqOgAwIBAgIUCuaTEur9s5SGSkbmfI/w12uvmQ4wDQYJKoZIhvcNAQEL
// BQAwbDELMAkGA1UEBhMCU1QxCzAJBgNVBAgMAlNUMQwwCgYDVQQHDANMT0MxCjAI
// BgNVBAoMAU8xCzAJBgNVBAsMAk9VMQwwCgYDVQQDDANDTlQxGzAZBgkqhkiG9w0B
// CQEWDHRlc3RAdGVzdC5mcjAgFw0yNDA1MjAxNTI5MTZaGA8yMTI0MDQyNjE1Mjkx
// NlowbDELMAkGA1UEBhMCU1QxCzAJBgNVBAgMAlNUMQwwCgYDVQQHDANMT0MxCjAI
// BgNVBAoMAU8xCzAJBgNVBAsMAk9VMQwwCgYDVQQDDANDTlQxGzAZBgkqhkiG9w0B
// CQEWDHRlc3RAdGVzdC5mcjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
// AOujAv0eW0iO9aKZyV3lvV+1swNPt4IMzVf8uNoKA7nPYjUkM0vX69n+gXySC6A8
// 0Y9KKX7clXw5/RWaaQml1bRQW/R1mxcm94a4UQUI08S3DxSVjqttokxZzq5lachT
// ajVmkKVw1DBX/FschWxViD1O9RGOc7J9XIOld21cyVRzjXfcQAf5EQ0I3J46cr3r
// aD3RNcvbdBioDCZ6WzzJGesT3as4vSLqh70BBBX9BZzEIG8VTsL8yqrQRTOxhq8c
// 5cSUR2I47S1Nu1uXP52OXb7Br21E7VrEJP+gDs2INEKylIZDJoKWK7n8RmV0a49i
// vYu7b2SSzT65VQkJnZUPtfUCAwEAAaNTMFEwHQYDVR0OBBYEFEGzkDNpt/bjt3uA
// pbfY/WjssKOaMB8GA1UdIwQYMBaAFEGzkDNpt/bjt3uApbfY/WjssKOaMA8GA1Ud
// EwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAAAkFTvv4JjVLLRHiq3ZFRKw
// 32synVokLS+XM87x6DemsljO8JGXzzwxl/Xtj1AjU/ekWxffuUHcoHD5KO3ZYBq3
// 3NqD6BPJVXAyfpOurDIREMEuN8L9kgKb0XOfdhQAdwZcQnqb7dAyoGO1pjgbKHpe
// L8PvrfGKpXhTC+mVmgrZIlXixREMcu4Ey+AVAJHPeFaRSyFeqYDaMWlYcgBhgW8j
// 5XWmDbD4hrapD2dJWXcZSOBgSRfv2MkTGfNfoP8oF0WPe8HtavZmJLZ5D4Fr5+v9
// Gdi5xgdGt/M9cjPl5PMAak6Q9NjlKH0kJBvkP7GCfCam5PAKUqgl2h/lE6CByPw=
// -----END CERTIFICATE-----`;

// const key = `-----BEGIN PRIVATE KEY-----
// MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDrowL9HltIjvWi
// mcld5b1ftbMDT7eCDM1X/LjaCgO5z2I1JDNL1+vZ/oF8kgugPNGPSil+3JV8Of0V
// mmkJpdW0UFv0dZsXJveGuFEFCNPEtw8UlY6rbaJMWc6uZWnIU2o1ZpClcNQwV/xb
// HIVsVYg9TvURjnOyfVyDpXdtXMlUc4133EAH+RENCNyeOnK962g90TXL23QYqAwm
// els8yRnrE92rOL0i6oe9AQQV/QWcxCBvFU7C/Mqq0EUzsYavHOXElEdiOO0tTbtb
// lz+djl2+wa9tRO1axCT/oA7NiDRCspSGQyaCliu5/EZldGuPYr2Lu29kks0+uVUJ
// CZ2VD7X1AgMBAAECggEAAs0L2U+AeJzUIuR0FvYAy0wNRJOYOJHWuKdi5SD+D3DS
// 2tBVg0mXzFUGHvbV7+x2GnrdUaWoUVSjzIkPUiXS2tlZ+YVJmWZ/TB8RkxkmgGq1
// sLp/DN7axrgu2wXLiVJstINFw/19hYv43bNYET4NaxSTW7T+5u9rc7O6Oj6XzQTD
// J6i2hdXIHxZN5y88zrmQK5h02vQnU5az+b9jATGvoUMDXojAdLXq1lM4pOb0DzeL
// Vd7EwEk5CrssVYEvEb9NJEKYpz0H2FHtj/aJkAy7Mp4fhzjMtuNV1PX1Ws+TVsV9
// NxvI7KCyvP094bPtQvLGXRZLT9bOAftzA2+oqw1yMQKBgQD8TDAZ9wzcrPgHiLKz
// 3tMhxeX5yjUivlyFQ/MTcFUBzO1f8I/zkrR/zycdupJjGysYcFtWpc5P9q5w3tcy
// YPFhxflhzeijsr1TMKQFoorPYGajRrFHiTO8WKCUU8U3oTSfIiIm+z7xIZnKA89E
// R07HAuTgkmXkizOD7fEMyFmlOQKBgQDvGDvNyRcgdXVCWkxCxL8NHqJoQiJBQcep
// AbzLF+z3K+u+O1/kfa2VrcBzMvb1cwq/IAP6QWqKJelRObpx40d2BhfGqFyDJy+O
// +PW2xXheTKVQU7FgjUgYf3Hzy5Yq5A3hmlm+fclHg5Y1BvyJukCdbFJithhdtDWw
// zFnzEJJynQKBgDptRmJs9PyRzeqovIGtI4XZt5VuP3npTbHK95rT08vT8lDae+uz
// WLuUdIGM+GOdIhDJzE03npykCue2o21WR/AVkdgVgD+QoAmI5SMs7ipyL7K2J03i
// tylx+NYAxFZKrc4AcJpIat4aouvGkBRG0zaBNBHRtWkE14xA6SbFqwT5AoGAKxqc
// VXomUDS8wgyTaQodQ1k9gDxD/q3EOATXK2oRz3G8m1wK6p95tt1PL7WFbjSiQFie
// PvSiJ2u0R2933GZUEMQCb08U9pQO7+CUM7IgBCgfOX8NIFH4KGp5ebE/TlY05nI0
// MbJtohXn84Fh79aDJZ5Mr/0SIXqGn2wH31kifcUCgYB75gVmm/lotUZGzWoUrOky
// 8W9d4MVSClLmvwladEPGJH/jKp616qZ632RiuIRYDVeb3l1GJp6RI1UlkjjNmSdn
// f3S9KaT9SWj5MXAATVaFS9L1P+dr8E91HcXt0aOkb7GKPwTTgxthqHpI3yhDtVH8
// naRrHyeKJ3lNkayS08anEA==
// -----END PRIVATE KEY-----`;

//         return {
//             cert,
//             key
//         }

    }
}
