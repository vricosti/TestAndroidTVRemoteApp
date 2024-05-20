import forge from "node-forge"
import * as jsEnv from "../utils/utils.js";

export class CertificateGenerator {

    static async generateFull(host, name, country, state, locality, organisation, OU){

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
// MIID3jCCAsagAwIBAgIUZXqBLTheKkfMUxTO7KrxppCofnMwDQYJKoZIhvcNAQEL
// BQAwdTELMAkGA1UEBhMCRlIxCzAJBgNVBAgMAlNUMQwwCgYDVQQHDANMT0MxCjAI
// BgNVBAoMAU8xCzAJBgNVBAsMAk9VMRUwEwYDVQQDDAxTZXJ2aWNlIE5hbWUxGzAZ
// BgkqhkiG9w0BCQEWDHRlc3RAdGVzdC5mcjAgFw0yNDA1MjAxNzA2MDdaGA8yMTI0
// MDQyNjE3MDYwN1owdTELMAkGA1UEBhMCRlIxCzAJBgNVBAgMAlNUMQwwCgYDVQQH
// DANMT0MxCjAIBgNVBAoMAU8xCzAJBgNVBAsMAk9VMRUwEwYDVQQDDAxTZXJ2aWNl
// IE5hbWUxGzAZBgkqhkiG9w0BCQEWDHRlc3RAdGVzdC5mcjCCASIwDQYJKoZIhvcN
// AQEBBQADggEPADCCAQoCggEBAK4FBObzg5dB+hesplQw1lbINYKxp7wNvwfHvAYy
// Ktvskeh4CV+Ib/FrbS100pcmfSFBov7cQKLDZCSYIgsdI3xIEa2uBKUXXW/f3oza
// bKdBl0Od8ndpdh84JfuQE7uXeqDF8u7BPIZdyeRi36r/4qEw210fI7g7/Z4Pl98r
// ZYinw2uK69dFmH7MyfFHmzK0uPm/Gbl1Rk0BIEeiNQLYt+GplsM/Yw8VPtK0rXRq
// ovI5JHur2Q/Z0Cj+Cz+EErSSpRW1mfVA9OzdGqTZhHNdw17BKjik+yHAmBdP0SRo
// bklRkHNgn/g76Prvryoi2kxd2qHbx1qKW8W55Fo4vQXND/ECAwEAAaNkMGIwHQYD
// VR0OBBYEFGk/SF91s5GYOXV1DQE05ybB9YOKMB8GA1UdIwQYMBaAFGk/SF91s5GY
// OXV1DQE05ybB9YOKMA8GA1UdEwEB/wQFMAMBAf8wDwYDVR0RBAgwBocEwKgBZjAN
// BgkqhkiG9w0BAQsFAAOCAQEAQbXr79QdWuRXMFpoLUKa/xBvBe4wE81JxibgNf11
// sQYQXdZ0FAHAglimTz7WlvOvnjBQ7Kz2moqNbnmYOd8HFQfl5VmellxGTNM1Whry
// 3E9rdOL4QL03NMr8YWYNESTcs525jeIKGEk/ylXMuQ8BQUULciHC0+xSmfrv4dpT
// NxEB4ibYXpYYWjgRFVhOGOLIEEAkhYBLXGwuOEQMamcQgb3KPYX3Hx/TwLxCmMB8
// 1dshBgawXbHAjWOGerK/HWBt1KweaXrtKbNPucziZO4T1/guScoGznq1fh1swUou
// DG2l0jP0S7kC9QvkC3nJmf4r+frflWDZk6lioSuexKx4Zw==`;

// const key = `-----BEGIN PRIVATE KEY-----
// MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuBQTm84OXQfoX
// rKZUMNZWyDWCsae8Db8Hx7wGMirb7JHoeAlfiG/xa20tdNKXJn0hQaL+3ECiw2Qk
// mCILHSN8SBGtrgSlF11v396M2mynQZdDnfJ3aXYfOCX7kBO7l3qgxfLuwTyGXcnk
// Yt+q/+KhMNtdHyO4O/2eD5ffK2WIp8NriuvXRZh+zMnxR5sytLj5vxm5dUZNASBH
// ojUC2LfhqZbDP2MPFT7StK10aqLyOSR7q9kP2dAo/gs/hBK0kqUVtZn1QPTs3Rqk
// 2YRzXcNewSo4pPshwJgXT9EkaG5JUZBzYJ/4O+j6768qItpMXdqh28dailvFueRa
// OL0FzQ/xAgMBAAECggEADEo9dOQo3INj2s0uOA707E8afF74pi7gWXfRPyzG2x5j
// laP4oX8czNOV89pmzxcASlt82/wJMpWTGoSGDvvhWDMs0HPUTyaNyktox9DbUJqw
// yK08hRN1LLJF+HTN9/c0SWuBgzwxfpncGt2ix0xoIJM3QuXim23dNQ8L3k6Nzq9Q
// lP5tue2fUaQuTLx6O9RmPPfSQklNILaTZF2C4+fp4yaJqh9fMxJIzVDHYczbwuo5
// MXGS1Zc3nTDi7L+Ez69heFZpLj1qlwk0jOqRGYp8/A3XjFUVjYiQXnQyqOYwe/l4
// mmWHu/cXbCHyrLTjkZQYbGPfmocNal/3XGuhJO7jwwKBgQDkj2Rg2TFkP9TMTkhP
// Fq/zAxZe0BkXLS150CdAFxRC9lp0aOU/p8vVce2feSU5Y22MGunMgt1nmXuBpfyL
// YSFs5wly/prxDr34fsm4ZiVXkXVWXsydjS2y3BvLf3FA2FPekDNoYVLPR2hbNw0T
// aUWRdYIsJFAf3tLGbpDuzCv+zwKBgQDC6V5y25oRKkhxEnxhorCdu7Il2LVnLgCc
// bmo2IqxFLvwDpbWTIbxoNgTTC3293KwB7Ujg0cnC4tVpkW3///9NDLD9o5F6Hzty
// c4s4JelFlKs7E5S6d1YWieepN4QyDPdbjn2MBQqYtQd2iX7nr/rVWyAcx6Ckhh4j
// A+jDU1+1PwKBgG+8Zh8urwXKatbCgnkfpz7PSJVreIirDmtZxoZ/gelGlGwKh+B5
// wJ2Fh9yJlhgbMofm9FuFsoWeNBHquq7M+lFKFYWBUO/9/ANKwIUEcsb/lnR1/eQc
// C7ZAAtqWYCCKYV4R8v/ZbGlnCG5nWF4f/eGhp9S6n+0kurhFf1cuu2djAoGAFg/I
// KwQESlEY5gOLpJl/mDr4jSQcVFN2qj4tM3d1PFd3GwqUpNS6uKj0nta8ItNpfMZY
// 62mThsWaFlrpsoJNaXE4T11GSCZk2i2N4osX/lI3l3Y97WU4j1CIsjSgd/HTxb85
// IrInYuWKtLYXcS4QHDo2RkuqOTUdECWPIRy8xo0CgYAz8opN1E/PKh+NEoWYNtvT
// zRmgvMrJKjE2rU90mYZJ5uYOnEFAVWrBCgIjuFo83NoXdbWsYO+TNKoaQOKTJKrM
// 95xHQfErkKl/JDFsgz4CLvnb5Lpo6983OVOo03hJKMoGLL7TtpKpRmnB85y7JgbB
// UWazUHdKLdTUqPnIN8HZJg==
// -----END PRIVATE KEY-----`;

//         return {
//             cert,
//             key
//         }
    }
}
