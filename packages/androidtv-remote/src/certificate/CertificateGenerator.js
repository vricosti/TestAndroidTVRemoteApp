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
    }
}
