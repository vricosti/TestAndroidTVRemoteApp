# Getting Started

This project aims to port **androidtv-remote** to react-native.  
First steps includes to remove all specific node dependencies and use **react-native-modpow**.  
So instead of using the standard **androidtv-remote**, there is my patched version inside the packages folder.  

// react-native-tcp
server_certificate: {
    "bits": 2048,
    "ca": false,
    "exponent": "0x10001",
    "fingerprint": "7B:4E:28:25:18:0E:F4:D5:B7:CD:62:11:4D:45:D3:14:BF:17:AE:2A",
    "fingerprint256": "CE:B3:AC:15:18:76:EE:8C:A4:81:57:1E:6D:CE:A6:6B:B0:05:8D:E1:31:31:D8:C6:5B:F6:EC:00:53:C6:81:E6",
    "fingerprint512": "05:7A:9F:C0:AD:DB:B9:3F:C1:39:E5:05:2F:08:40:58:47:30:40:69:27:1F:16:C9:F6:01:5C:D4:8D:E6:46:09:F4:3C:35:B3:5E:C2:99:6D:01:3C:62:FB:0A:D9:40:5B:8A:73:77:03:6B:D0:03:FB:5C:A9:27:C8:38:57:64:3E",
    "issuer": {
        "CN": "atvremote/863600S191201703",
        "dnQualifier": "-full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2"
    },
    "modulus": "D619A8E781C7CEC93C8B4FBF84D6B1FB356D651E160CFE85FF72574F563762D6153FB1E35B94C75D25EF9FEE2254F80EC3016B8397C577637A86793902CE7A2ACDA1FABFEBDD4CEE1EF322627924A5B5BCF5BD15A00858EF8D304A1932C58D13271FC8A63D58954EB9A01E80C5658CEFC3001C802D349B81FBF0C5BCA4E96681A3DF612ADA51F21217E71C2614AE44F6EE3913A7D4F25A3E8B21891915F7329203CABBDD0B0CDA85B71AC10AF03D777E784F2ADB65D0586D6DC26B8561D23A5FBB10CFCCEC919D21968B8230159748BAFD2F2EED5330ECA9DDA17321B4782FE101BEF34AA12C035853E75519EC5003FEE747428E4EBFCD236EE05A2EE04C2293",
    "pubkey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1hmo54HHzsk8i0+/hNax+zVtZR4WDP6F/3JXT1Y3YtYVP7HjW5THXSXvn+4iVPgOwwFrg5fFd2N6hnk5As56Ks2h+r/r3UzuHvMiYnkkpbW89b0VoAhY740wShkyxY0TJx/Ipj1YlU65oB6AxWWM78MAHIAtNJuB+/DFvKTpZoGj32Eq2lHyEhfnHCYUrkT27jkTp9TyWj6LIYkZFfcykgPKu90LDNqFtxrBCvA9d354TyrbZdBYbW3Ca4Vh0jpfuxDPzOyRnSGWi4IwFZdIuv0vLu1TMOyp3aFzIbR4L+EBvvNKoSwDWFPnVRnsUAP+50dCjk6/zSNu4Fou4EwikwIDAQAB",
    "serialNumber": "1773AA71FED",
    "subject": {
        "CN": "atvremote/863600S191201703",
        "dnQualifier": "-full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2"
    },
    "valid_from": "Jan 25 11:00:00 2021 GMT",
    "valid_to": "Jan 19 03:14:07 2038 GMT"
}

```
server_certificate:  {
  subject: [Object: null prototype] {
    dnQualifier: 'full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2',
    CN: 'atvremote/863600S191201703'
  },
  issuer: [Object: null prototype] {
    dnQualifier: 'full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2',
    CN: 'atvremote/863600S191201703'
  },
  ca: false,
  modulus: 'D619A8E781C7CEC93C8B4FBF84D6B1FB356D651E160CFE85FF72574F563762D6153FB1E35B94C75D25EF9FEE2254F80EC3016B8397C577637A86793902CE7A2ACDA1FABFEBDD4CEE1EF322627924A5B5BCF5BD15A00858EF8D304A1932C58D13271FC8A63D58954EB9A01E80C5658CEFC3001C802D349B81FBF0C5BCA4E96681A3DF612ADA51F21217E71C2614AE44F6EE3913A7D4F25A3E8B21891915F7329203CABBDD0B0CDA85B71AC10AF03D777E784F2ADB65D0586D6DC26B8561D23A5FBB10CFCCEC919D21968B8230159748BAFD2F2EED5330ECA9DDA17321B4782FE101BEF34AA12C035853E75519EC5003FEE747428E4EBFCD236EE05A2EE04C2293',
  bits: 2048,
  exponent: '0x10001',
  pubkey: <Buffer 30 82 01 22 30 0d 06 09 2a 86 48 86 f7 0d 01 01 01 05 00 03 82 01 0f 00 30 82 01 0a 02 82 01 01 00 d6 19 a8 e7 81 c7 ce c9 3c 8b 4f bf 84 d6 b1 fb 35 ... 244 more bytes>,
  valid_from: 'Jan 25 11:00:00 2021 GMT',
  valid_to: 'Jan 19 03:14:07 2038 GMT',
  fingerprint: '7B:4E:28:25:18:0E:F4:D5:B7:CD:62:11:4D:45:D3:14:BF:17:AE:2A',
  fingerprint256: 'CE:B3:AC:15:18:76:EE:8C:A4:81:57:1E:6D:CE:A6:6B:B0:05:8D:E1:31:31:D8:C6:5B:F6:EC:00:53:C6:81:E6',
  fingerprint512: '05:7A:9F:C0:AD:DB:B9:3F:C1:39:E5:05:2F:08:40:58:47:30:40:69:27:1F:16:C9:F6:01:5C:D4:8D:E6:46:09:F4:3C:35:B3:5E:C2:99:6D:01:3C:62:FB:0A:D9:40:5B:8A:73:77:03:6B:D0:03:FB:5C:A9:27:C8:38:57:64:3E',
  serialNumber: '01773AA71FED',
  ```

# DEPRECATED:  I SOLVED THE ISSUE  

Now I have an issue with the TLS connection and self-signed certificate:  
[https://stackoverflow.com/questions/2012497/accepting-https-connections-with-self-signed-certificates](https://stackoverflow.com/questions/2012497/accepting-https-connections-with-self-signed-certificates)  
[https://stackoverflow.com/questions/1217141/self-signed-ssl-acceptance-on-android](https://stackoverflow.com/questions/1217141/self-signed-ssl-acceptance-on-android)  
[https://socketio.github.io/socket.io-client-java/initialization.html#SSL_connections](https://socketio.github.io/socket.io-client-java/initialization.html#SSL_connections)  
[https://github.com/socketio/socket.io-client-java/issues/293](https://github.com/socketio/socket.io-client-java/issues/293)  
  

[https://www.guardsquare.com/blog/how-to-securely-implement-tls-certificate-checking-in-android-apps](https://www.guardsquare.com/blog/how-to-securely-implement-tls-certificate-checking-in-android-apps)  
[https://medium.com/@mohamed.ma872/simplifying-ssl-certificate-integration-in-android-apps-a-practical-guide-5bb648313e70](https://medium.com/@mohamed.ma872/simplifying-ssl-certificate-integration-in-android-apps-a-practical-guide-5bb648313e70)  
[https://www.yoctopuce.com/FR/article/utiliser-tls-ssl-avec-notre-librairie-android](https://www.yoctopuce.com/FR/article/utiliser-tls-ssl-avec-notre-librairie-android)  


```
openssl s_client -state -connect 192.168.1.102:6467
CONNECTED(00000003)
SSL_connect:before SSL initialization
SSL_connect:SSLv3/TLS write client hello
SSL_connect:SSLv3/TLS write client hello
Can't use SSL_get_servername
SSL_connect:SSLv3/TLS read server hello
depth=0 dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
verify error:num=18:self-signed certificate
verify return:1
depth=0 dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
verify return:1
SSL_connect:SSLv3/TLS read server certificate
SSL_connect:SSLv3/TLS read server key exchange
SSL_connect:SSLv3/TLS read server certificate request
SSL_connect:SSLv3/TLS read server done
SSL_connect:SSLv3/TLS write client certificate
SSL_connect:SSLv3/TLS write client key exchange
SSL_connect:SSLv3/TLS write change cipher spec
SSL_connect:SSLv3/TLS write finished
SSL3 alert read:fatal:handshake failure
SSL_connect:error in error
4027657F22760000:error:0A000410:SSL routines:ssl3_read_bytes:sslv3 alert handshake failure:../ssl/record/rec_layer_s3.c:1584:SSL alert number 40
---
Certificate chain
 0 s:dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
   i:dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
   v:NotBefore: Jan 25 11:00:00 2021 GMT; NotAfter: Jan 19 03:14:07 2038 GMT
---
Server certificate
-----BEGIN CERTIFICATE-----
MIICNzCCAiCgAwIBAgIGAXc6px/tMA0GCSqGSIb3DQEBCwUAMF0xNjA0BgNVBC4M
LWZ1bGxfZmJ4NmxjdjIvZmJ4NmxjdjIvRnJlZWJveCBQbGF5ZXIgTWluaSB2MjEj
MCEGA1UEAxMaYXR2cmVtb3RlLzg2MzYwMFMxOTEyMDE3MDMwHhcNMjEwMTI1MTEw
MDAwWhcNMzgwMTE5MDMxNDA3WjBdMTYwNAYDVQQuDC1mdWxsX2ZieDZsY3YyL2Zi
eDZsY3YyL0ZyZWVib3ggUGxheWVyIE1pbmkgdjIxIzAhBgNVBAMTGmF0dnJlbW90
ZS84NjM2MDBTMTkxMjAxNzAzMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEA1hmo54HHzsk8i0+/hNax+zVtZR4WDP6F/3JXT1Y3YtYVP7HjW5THXSXvn+4i
VPgOwwFrg5fFd2N6hnk5As56Ks2h+r/r3UzuHvMiYnkkpbW89b0VoAhY740wShky
xY0TJx/Ipj1YlU65oB6AxWWM78MAHIAtNJuB+/DFvKTpZoGj32Eq2lHyEhfnHCYU
rkT27jkTp9TyWj6LIYkZFfcykgPKu90LDNqFtxrBCvA9d354TyrbZdBYbW3Ca4Vh
0jpfuxDPzOyRnSGWi4IwFZdIuv0vLu1TMOyp3aFzIbR4L+EBvvNKoSwDWFPnVRns
UAP+50dCjk6/zSNu4Fou4EwikwIDAQABMA0GCSqGSIb3DQEBCwUAAwIAAA==
-----END CERTIFICATE-----
subject=dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
issuer=dnQualifier = full_fbx6lcv2/fbx6lcv2/Freebox Player Mini v2, CN = atvremote/863600S191201703
---
No client certificate CA names sent
Client Certificate Types: RSA sign, ECDSA sign
Requested Signature Algorithms: RSA+SHA512:ECDSA+SHA512:RSA+SHA384:ECDSA+SHA384:RSA+SHA256:ECDSA+SHA256:RSA+SHA224:ECDSA+SHA224:RSA+SHA1:ECDSA+SHA1
Shared Requested Signature Algorithms: RSA+SHA512:ECDSA+SHA512:RSA+SHA384:ECDSA+SHA384:RSA+SHA256:ECDSA+SHA256:RSA+SHA224:ECDSA+SHA224
Peer signing digest: SHA256
Peer signature type: RSA
Server Temp Key: ECDH, prime256v1, 256 bits
---
SSL handshake has read 1072 bytes and written 423 bytes
Verification error: self-signed certificate
---
New, TLSv1.2, Cipher is ECDHE-RSA-CHACHA20-POLY1305
Server public key is 2048 bit
Secure Renegotiation IS supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-CHACHA20-POLY1305
    Session-ID: 12ADD26E75B92478C7DF4E5DC2A5E6AFF06497F4B8C76078FF0D87A380D09172
    Session-ID-ctx: 
    Master-Key: 1ADFA18BFE450E224AAF2CDF2424F1677A3A6FE902850698F890DEBDD0198AB481E9A9A7967A6A767AB2A44873BD14DA
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    Start Time: 1716197431
    Timeout   : 7200 (sec)
    Verify return code: 18 (self-signed certificate)
    Extended master secret: yes
---
```



I tried to add servercert with no success and to use a hardcoded cert instead of a dynamic one 
inside CertificateGenerator.generateFull

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">android-2.local</domain>
        <domain includeSubdomains="false">localhost</domain>
        <domain includeSubdomains="false">127.0.0.1</domain>
        <domain includeSubdomains="false">10.0.2.2</domain>
        <domain includeSubdomains="false">10.0.3.2</domain>
    </domain-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="@raw/client_selfsigned"/>
            <certificates src="@raw/servercert"/>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```


Inside node_modules/react-native-tcp-socket/android/src/main/java/com/asterinet/react/tcpsocket:

Add some code to see if passed ca was resolved:

```
...
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.ByteArrayInputStream;
...

final class SSLCertificateHelper {
public static final String LOG_TAG = "com.testandroidtvremoteapp";
...

static SSLSocketFactory createCustomTrustedSocketFactory(@NonNull final Context context, @NonNull final String rawResourceUri) throws IOException, GeneralSecurityException {
        
        Log.d(LOG_TAG, "Entering createCustomTrustedSocketFactory");
        Boolean logCA = true;
        Certificate ca = null;

        if (logCA) {
            InputStream caInput = getRawResourceStream(context, rawResourceUri);
            Log.d(LOG_TAG, "rawResourceUri: " + rawResourceUri);
            // Read the input stream into a byte array
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = caInput.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            byte[] caBytes = byteArrayOutputStream.toByteArray();
            caInput.close();

            // Convert the byte array to a string and log it
            String caContent = new String(caBytes);
            Log.d("CA Content", caContent);

            // Convert the byte array back to InputStream
            InputStream caInputForCert = new ByteArrayInputStream(caBytes);

            // Generate the CA Certificate from the raw resource file
            ca = CertificateFactory.getInstance("X.509").generateCertificate(caInputForCert);
            caInputForCert.close();
        } else {
            InputStream caInput = getRawResourceStream(context, rawResourceUri);
            // Generate the CA Certificate from the raw resource file
            ca = CertificateFactory.getInstance("X.509").generateCertificate(caInput);
            caInput.close();
        }
        ...
}
```

I have added a simulate-androidtv-server but it does not simulate very well since it works fine...
