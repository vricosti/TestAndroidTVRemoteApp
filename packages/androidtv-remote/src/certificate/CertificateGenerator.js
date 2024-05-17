import forge from "node-forge"
import modPow from 'react-native-modpow'

// handle react-native slow modpow function
if (typeof HermesInternal !== "undefined") {
    console.log('react-native detected => patch to use react-native-modpow');

    forge.jsbn.BigInteger.prototype.modPow = function nativeModPow(e, m) {
        const result = modPow({
            target: this.toString(16),
            value: e.toString(16),
            modifier: m.toString(16)
        });

        return new forge.jsbn.BigInteger(result, 16);
    };
}

export class CertificateGenerator {

    static generateFull(name, country, state, locality, organisation, OU){
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
