import forge from "node-forge"
import modPow from 'react-native-modpow'

export class CertificateGenerator {

    static generateFull(name) {

        console.log(`Entering generateFull(${name})`);
        console.log('modPow: ', modPow);

        forge.jsbn.BigInteger.prototype.modPow = function nativeModPow(e, m) {
            const result = modPow({
                target: this.toString(16),
                value: e.toString(16),
                modifier: m.toString(16)
            });

            return new forge.jsbn.BigInteger(result, 16);
        };
        
        let date = new Date();
        date.setUTCFullYear(2021);
        let date2 = new Date();
        date2.setUTCFullYear(2099);
        let keys = forge.pki.rsa.generateKeyPair(3072);
        let cert = forge.pki.createCertificate();
        cert.publicKey = keys.publicKey;
        cert.serialNumber = '01' + forge.util.bytesToHex(forge.random.getBytesSync(19));
        cert.validity.notBefore = date;
        cert.validity.notAfter = date2;

        let attributes = [
            {name: 'commonName', value: name},
            // {name: 'countryName', value: country},
            // {shortName: 'ST', value: state},
            // {name: 'localityName', value: locality},
            // {name: 'organizationName', value: organisation},
            // {shortName: 'OU', value: OU}
        ];
        cert.setSubject(attributes);
        cert.setIssuer(attributes)
        cert.sign(keys.privateKey, forge.md.sha256.create());

        console.debug('Exiting generateFull');

        return {
            cert : forge.pki.certificateToPem(cert),
            key : forge.pki.privateKeyToPem(keys.privateKey),
        }

//         const cert = 
// `-----BEGIN CERTIFICATE-----
// MIIEMTCCApmgAwIBAgIUfyLiOx0WEeSWr137zDRaq0whhUgwDQYJKoZIhvcNAQEL
// BQAwJzElMCMGA1UEAwwcY29tLmxvdGFsb2dpYy5sb3RhLXJlbW90ZWN0bDAgFw0y
// NDA1MjEwOTQ1MzVaGA8yMTI0MDQyNzA5NDUzNVowJzElMCMGA1UEAwwcY29tLmxv
// dGFsb2dpYy5sb3RhLXJlbW90ZWN0bDCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
// AYoCggGBAKXicTxL94Dms2D4kT2sjJHk/WYh0T2De3y0ki9xgtz4kDUmGd5s4kdp
// HOafE+v3z7Wo/zQJjvpRkK4aae5+ynY9AIhQlmRpmGYmu6Zd2qoqrwMQSmKAd7D2
// NwMq/GIpPlqAo3X7NIg5rVlRb7t+SQezPfXzrlzld+6z0GsPp1GOWFThvCqT2jRi
// 8ird08hX7XjoW4u+UlsZzmKc7bi6BDTUe59BxC6Xzj9KY5bAEGX9gCXjnj1M/Zi6
// o3MwsMyH192RQd9bKvx8NRELFSJhLVfwfR+BhfWX5NBLkIryhxC6T33DS+ObLqHo
// GCZMYbrD0E3R6Ru8EG7E48BeRk95GY9OTW2+y1G7NuDfBhcBLNbBzSMBBCceiZMd
// ZosSGN/7mIiau26YjbQsjHE8ttIzIOG7QumMk+5dw/pqn8N5rn0k/G5ZgQjqN2Zk
// 3T8iOpadZu6DiqMgZ4n+huY7rbv9EFT3x5YeP4lxXLcTUlaTkR5HuSCQDI5BhD60
// neP/al0P9QIDAQABo1MwUTAdBgNVHQ4EFgQUg5VqPPElE2+5pGbE75GgWJIavnMw
// HwYDVR0jBBgwFoAUg5VqPPElE2+5pGbE75GgWJIavnMwDwYDVR0TAQH/BAUwAwEB
// /zANBgkqhkiG9w0BAQsFAAOCAYEAOrX+zzbF8xj7nryMDv0m/bsKqW3uQKlN/nX3
// N8dUjS8pBQPXOkYYw04tB7zF2VzhtO3WPhPy2TQbdHYboaOj0PSVOxjfDdpCZchD
// cFc98cu3S0qTBzs+M82mHW1+dHOwjpg9A26hJiiuWG1M1qIRQhhH2el21TJ12RjV
// oOFpmForglL7p4MFDV2vmY+HqZQAZhtZdCCc7N6Oq/NLNUHkxIaGNMdD4K9387PR
// s/bgEdc3JihgIHgigT4WkZp7HUrHbyatGcfQC3yBEFMkod7heKYeWB6BBIY+TD/K
// FDk/t+IMwVHP3qAXy5Zq+jsMSENi14AocmVIr/SG7Hp4QGSWuUvuJaha3ob5kCuh
// oALxVDd1Q9Ggy57HzCxii5f8FX3sI1Ed9IPGCkDyAs6u83gCuKkf+TrN6sfJhNwb
// SgvfZNj4SNCZHcSrC8ggcVExL0kdD1HX2t5BDk+P4+slLYG/PU94PH5v5I0byoG6
// BCjm7Fkrod7GeC/fIvht8mups4kr
// -----END CERTIFICATE-----`;

//         const key = 
// `-----BEGIN PRIVATE KEY-----
// MIIG/QIBADANBgkqhkiG9w0BAQEFAASCBucwggbjAgEAAoIBgQCl4nE8S/eA5rNg
// +JE9rIyR5P1mIdE9g3t8tJIvcYLc+JA1JhnebOJHaRzmnxPr98+1qP80CY76UZCu
// Gmnufsp2PQCIUJZkaZhmJrumXdqqKq8DEEpigHew9jcDKvxiKT5agKN1+zSIOa1Z
// UW+7fkkHsz31865c5Xfus9BrD6dRjlhU4bwqk9o0YvIq3dPIV+146FuLvlJbGc5i
// nO24ugQ01HufQcQul84/SmOWwBBl/YAl4549TP2YuqNzMLDMh9fdkUHfWyr8fDUR
// CxUiYS1X8H0fgYX1l+TQS5CK8ocQuk99w0vjmy6h6BgmTGG6w9BN0ekbvBBuxOPA
// XkZPeRmPTk1tvstRuzbg3wYXASzWwc0jAQQnHomTHWaLEhjf+5iImrtumI20LIxx
// PLbSMyDhu0LpjJPuXcP6ap/Dea59JPxuWYEI6jdmZN0/IjqWnWbug4qjIGeJ/obm
// O627/RBU98eWHj+JcVy3E1JWk5EeR7kgkAyOQYQ+tJ3j/2pdD/UCAwEAAQKCAYAA
// 7Cp2g5TW/SSoxXb66hd6CZD5mOWddvYxcll/pAvl7gfzAqbmk9UbYxftuCPTfUEe
// hy00sGm4JOzpyePzMNynhBTMnDSFpCsYM6vgJuneMu5vsw8G175SqSaKoxoYWWPV
// +4uxcJwiPySrDaCN6aVpqPMxdqJ3AWQ4wY0+tMcc93b0031aM8xtl58CnmsyOqHi
// /WHzWd5XyAYXmzx6rJUXI7k9E7H0V5RzL+xjD6LHtePMOIuBVxoSNbPGEVsNjXhf
// GDsgzBQRyGPck07HKorltho+R2Wg5rIIp3peGc4wCOFbbSP8P7gTTeftnJ+JB509
// BDYOrWSIBLrCCa06NSOX6fPOKem/HnJdRUlXoqy6uljYE8aOSTsap/RgiFHDxitR
// 2ga9cslGCnOeZ3UsjOnYL8YSwG5/rHMMEew/jSsJ+YC7VNEk/xKWaeBH1feJbDAH
// Z2gB0rJ3AyNwCF0dl6Fs5u5Ptk13aezBIRvOoqIntFDJCwRwXapj/uAOH5/4Q10C
// gcEA2gr/XKhqirjXyvb5XBmlNvqmw5va/VWOGQhMJ3Ko22Q8RL1oI5/6qE6JvEiD
// uLuNV9iNPJssJCfejtbLYsD8Xn8L8LTDIDaSnhztULyMaV+ikbUEsfMQ+ijeO9Pl
// XLl6B3M5n64qLcks0kXJd8z/5+C/GMVOh8Up2Zy60Tc/ukpa8TWzt4OJvCgNniKe
// /Y1ucwXY3PFzAYh+FfX0NuGZZFhcZhiTSLpNTnkQIsa/2JsUy5UYyds5nXJZB0k2
// BKWfAoHBAMLDBkWhzPNuM+dGzrFzXQ6yuFs2miMQp57VoZaPKjnsoLQ/klOBOf/L
// Q1zAJYWCbkD0h9+DyHf+A6vQw7o3kyfzXnB0EC2i4T1uXK5H7eBV3uEHR8LdOyWg
// mKM6hvxB3a6dJA5ezqUQrtvg+x1GnkKP7NpN3JN+A3NVX6xKEnWtmkzl2CAgryZU
// ZGlV1Z+H21y/hkx0hjoSQlYx6Bil9va9qLvt/mXyvUirZRShym6xBwY3ZPVaeZnE
// aSdL+8OZ6wKBwBsaFtebj3Kiux/dRu1tup101lml+7hVdA4ke+LDW725XcxlhpY3
// Al79NB2VHdpOZakvn46S8w+jbQRwKmOh/Tx5qjBHJ6HPZrYEfnL0nLdUTc6yo1zD
// C68seUMSeYXnAAYBCn6QlWmPgeS5C+u6LWzTAK3BiJtTpHoKAyaSKXesWlV1CVuc
// G/ipOdgYEY8Oj1X4uhXsZREhuBpesfZIYFqaqRF/qH73uTgx0BGihqIT1KfhZm1g
// tG6fkfVX4kD9nQKBwD1R3fWqfbbfKaRVnNot8kygZH8DcAA+TCgsJtYaeTcHk4ls
// wotcEoDA5JKdRLMGX+Q/mU/8U+/DoDBGaHmG6eQYMdHCGR3lPHl09+U/bFvHbYb4
// HdXyhZ7RM32g/cMKkdtaSnHj07gQyp0b9rQ++bEHU5FgFmSxtjBn3tmF8M3wPLad
// XzCuWbb9tyebCMlTovNOsd/8iA5clVpCGEs6ZclF6YxR4FkE1ie9HvQiBHRZdFa2
// tiixtbt+JYVj3P62xQKBwQCVpwBQ94RDcQm3Vt1b0DeQi8Boqnkf4OlcX+nNAyZg
// IL3oktIIqEG2HCO4tDZj6LOu8lmdRD03iFhU3zMF2crpLnRW7kft+7bJCNPEa72T
// 00EFM1g7HAK/WcyQ4YDG1CZ8vMbFT2dRdsN4Dd4rOag7T5XcKlNi7wavrieH3CDc
// +jf/9ZJ0fyNlM2EbkamwSh2VJFA2xiMWC+ije+Y/nS4MDyFfWG+oWMKZXcyL+7bs
// BuPMga8nXp44OFAhIhmJHjY=
// -----END PRIVATE KEY-----`;

//         return {
//             cert,
//             key
//         }
    }

    static initClientCertificate() {
        console.debug('initClientCertificate');

    }
}
