/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AndroidRemote, RemoteKeyCode, RemoteDirection } from 'react-native-androidtv-remote';

function App(): React.JSX.Element {
    console.log('Entering App()');

    const [code, setCode] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const androidRemoteRef = useRef<AndroidRemote | null>(null);

    useEffect(() => {
        
      console.log('Entering App.useEffect()');
      
        // My androidtv device has ip 192.168.1.102 (android-2.local)
        const host = "192.168.1.102";
        const options = {
            pairing_port: 6467,
            remote_port: 6466,
            service_name: 'com.lotalogic.lota-remotectl',
            systeminfo: {
                manufacturer: 'default-manufacturer',
                model: 'default-model'
            },
            // Mandatory for the connection to work on android
            cert: {
                key: null,
                cert: null,
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
        
        return () => { 
            if (androidRemoteRef.current) {
                androidRemoteRef.current.stop();
            }
        }; 

    }, []);

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
        <View style={{ padding: 20 }}>
            <Text>Status: {connectionStatus}</Text>
            <TextInput
                placeholder="Enter Pairing Code"
                value={code}
                onChangeText={setCode}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Submit Pairing Code" onPress={handlePairingCodeSubmit} />
            <View style={{ height: 10 }} />
            {/* You can expand below for more buttons for different commands */}
            <Button title="Mute" onPress={() => handleCommandSend('KEYCODE_MUTE')} />
            <View style={{ height: 10 }} />
        </View>
    );
}

export default App;
