/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { AndroidRemote, RemoteKeyCode, RemoteDirection } from 'react-native-androidtv-remote';

function App(): React.JSX.Element {
    console.log('Entering App()');

    const [code, setCode] = useState('');
    const [serverAddress, setServerAddress] = useState('192.168.1.102');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const androidRemoteRef = useRef<AndroidRemote | null>(null);

    useEffect(() => {
        return () => {
            if (androidRemoteRef.current) {
                androidRemoteRef.current.stop();
            }
        };
    }, []);

    let server_cert_pem = 
    `-----BEGIN CERTIFICATE-----
MIIFJTCCAw0CFBdy+MdLJpuqlDJfvW4z075HGo4HMA0GCSqGSIb3DQEBCwUAME8x
CzAJBgNVBAYTAkNPMQwwCgYDVQQIDANTVEExCzAJBgNVBAcMAkxPMQswCQYDVQQK
DAJPTjELMAkGA1UECwwCT1UxCzAJBgNVBAMMAkNOMB4XDTI0MTExNzE5MTk1N1oX
DTI0MTIxNzE5MTk1N1owTzELMAkGA1UEBhMCQ08xDDAKBgNVBAgMA1NUQTELMAkG
A1UEBwwCTE8xCzAJBgNVBAoMAk9OMQswCQYDVQQLDAJPVTELMAkGA1UEAwwCQ04w
ggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCoVUOMFidiirCd5/7DjZc1
VJqbRUHB0kLtPZYSdbyW5/J/WdKLgnpQbcddH1hdqBol4MKMonno2h42bUaLXh1g
0px5iNpPiyiEsyDgD9cFpV3iOF7pVNBke+so+CHH1R+tvNxtTod0n2cH/ZDl+b/k
tdvC3tc5fY84MquXsq1vWWRPlfUois4fD2TOyASc+gmK3vITeSYJa4JEF1KcdaCO
I7AQWU08ldTqvZYMMR+cBvd4yK7aHA+uViMN7c0exwEdsF6Qp+Tc1U6y93sKvQNJ
0SrJ8b++XoxcThp5J0vi9K65RWSGYI3eVG2p3Ri6soTntK+akfyuhmckcXWXCn43
7wI8nq1QEWaiOW2LuCCDpSTHjieq7J+hsLlupEFKYkVyYJ7kwN0BEyqNKfZL3lgF
qwYyXxJaLvi9BoXZlvuyiAjiRyXSFBRMn4YOg5/haJC4NEmX+CJwNVhzpzUnvARu
2pmdgAvJ8gAToHOsiJBnLYZvdYegcegDrNwqppuDOgdJo9344gyvUrkqIucauU2a
4lPd/3suaTNUrx2bahLL2JwF/3/jInpq2wVmzPkeiNW32GBlmYuq7egYvd5FcyvN
bg2+WTUZfuKi0vZDK1/0UBvwjIuQ/wxPGGOCmTIK2LrkvezDElOutrTzyjqrgeHD
85D8iIMzMuOtBDovhBSpZwIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQB7fe5E7jMW
fgGBN2xFSiWcAvLHr7gX55MZJcwneORPnKRn+ZsZ3oVjc8F2IT7i1AzfrtOsxdVM
abPelZOrH+0aH5Em0dScdCytECIZPSrOOULshJ2ReGEncg9uKB7OCdTVflqorb0G
bzpz0hG/DpGEVtpDsehtKkg5i/QE7MIUrOTx0lU6GQcUadEnu0Q3Jd/4AUVkEnkA
UObfxlLK7sEzUFaCjXBNmurUwB4/O8kDx+u/GiS9GJJwAZuGBL8o8Gb/6f861y91
AxJ2u98Z+Mv0vKiGiJye6noYBjr7jj/H4+yjUpMTwuKKRZWz7ux92+JvXPKNR7oB
anvu4XMuLTFYZOEpZUSjIUvELFcMIJPpv3/ORBwR+RJ5arddf10xPYC5hMlGhNAv
qgOLjPif61mhptW434fOwXa8juQMGjvAmBloJ0I2zX6MpIiyG4G34EQ9+3LAhAL3
i6A93FbraD5VgcofJPOSWbplSArT7AN7PeU3ABd41tR1TLIBpFiv0iVHW0MEVr4l
yhvu9zhyLsSBEL8AerinZbH+W6NOzbTQkNSkxwCP7RCFhAZVNjnRWPiN8lsQX4jD
e+P4ya9Uf3gDQwjH7pEyRYi0FquBUTU+UOS2DerVJesoe7gFXZeZXYmefcuNRWig
p1BRoarRpKIpXM/slm5rjO7xXJ1gRF7MAQ==
-----END CERTIFICATE-----`;

    const handleConnect = () => {
        console.log('Connecting to:', serverAddress);

        const host = serverAddress;
        const options = {
            pairing_port: 6467,
            remote_port: 6466,
            service_name: 'com.lotalogic.lota-remotectl',
            systeminfo: {
                manufacturer: 'default-manufacturer',
                model: 'default-model'
            },
            cert: {
                key: null,
                cert: null,
                ca: server_cert_pem,
                //androidKeyStore: 'AndroidKeyStore',
                //certAlias: 'lota-remotectl-atv-cert',
                //keyAlias: 'lota-remotectl-atv',
            }
        };

        if (!androidRemoteRef.current) {
            console.log('Before instantiating AndroidRemote');

            const androidRemote = new AndroidRemote(host, options);
            androidRemoteRef.current = androidRemote;

            console.log('After instantiating AndroidRemote');
            
            androidRemoteRef.current.on('secret', () => {
                Alert.alert("Pairing Required", "Enter the code shown on your TV.");
                setConnectionStatus('Pairing Needed');
            });

            androidRemoteRef.current.on('ready', () => {
                setConnectionStatus('Connected');
                Alert.alert("Connected", "Remote is ready.");
            });

            androidRemoteRef.current.on('error', (error: Error) => {
                Alert.alert("Error", error.toString());
            });

            androidRemoteRef.current.on('unpaired', () => {
                setConnectionStatus('Unpaired');
                Alert.alert("Unpaired", "The device has been unpaired.");
            });

            console.log('Before start()');
            androidRemoteRef.current.start().catch((error: Error) => {
                Alert.alert("Connection Error", error.message);
            });
        }
    };

    const handlePairingCodeSubmit = () => {
        console.log('handlePairingCodeSubmit: ', code);
        if (!androidRemoteRef.current) {
            console.log('handlePairingCodeSubmit: exiting');
            return;
        }
        console.log('androidRemote.sendCode(code): ', code);
        androidRemoteRef.current.sendCode(code);
    };

    const handleCommandSend = (cmd) => {
        if (!androidRemoteRef.current)
            return;

        if (cmd in RemoteKeyCode) {
            androidRemoteRef.current.sendKey(RemoteKeyCode[cmd], RemoteDirection.SHORT);
        } else {
            Alert.alert("Invalid Command", "Please enter a valid command.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text>Status: {connectionStatus}</Text>
            <View style={styles.serverAddressContainer}>
                <TextInput
                    placeholder="Enter Server Address"
                    value={serverAddress}
                    onChangeText={setServerAddress}
                    style={styles.serverAddressInput}
                />
                <Button title="Connect" onPress={handleConnect} />
            </View>
            <TextInput
                placeholder="Enter Pairing Code"
                value={code}
                onChangeText={setCode}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Submit Pairing Code" onPress={handlePairingCodeSubmit} />
            <View style={{ height: 10 }} />
            <Button title="Mute" onPress={() => handleCommandSend('KEYCODE_MUTE')} />
            <View style={{ height: 10 }} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 10
    },
    serverAddressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    serverAddressInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
    },
});

export default App;
