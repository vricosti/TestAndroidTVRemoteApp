# Getting Started

This project aims to port **androidtv-remote** to react-native.  
First steps includes to remove all specific node dependencies and use **react-native-modpow**.  
So instead of using the standard **androidtv-remote**, there is my patched version inside the packages folder.  


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
