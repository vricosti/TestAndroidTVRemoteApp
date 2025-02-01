/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
// TO use local package dist instead of src you have to uncomment inside metro.config.js
//import { AndroidRemote, RemoteKeyCode, RemoteDirection } from 'react-native-androidtv-remote';
import { AndroidRemote, RemoteKeyCode, RemoteDirection } from './packages/react-native-androidtv-remote/src';

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
                //ca: server_cert_pem,
                androidKeyStore: 'AndroidKeyStore',
                certAlias: 'lota-remotectl-atv-cert',
                keyAlias: 'lota-remotectl-atv',
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
