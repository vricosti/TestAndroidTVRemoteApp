/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { AndroidRemote, RemoteKeyCode, RemoteDirection } from './packages/androidtv-remote/src';

function App(): React.JSX.Element {
    const [code, setCode] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    let androidRemote = null;


    useEffect(() => {
        
      console.log('Entering useEffect()');
      
        // My androidtv device has ip 192.168.1.102 (android-2.local)
        const host = "192.168.1.102";
        const options = {
            pairing_port: 6467,
            remote_port: 6466,
            name: 'androidtv-remote',
            systeminfo: {
                manufacturer: 'default-manufacturer',
                model: 'default-model'
            }
        };

        console.log('Before instantiating AndroidRemote');
        
        androidRemote = new AndroidRemote(host, options);
        
        console.log('After instantiating AndroidRemote');

        androidRemote.on('secret', () => {
            Alert.alert("Pairing Required", "Enter the code shown on your TV.");
            setConnectionStatus('Pairing Needed');
        });

        androidRemote.on('ready', () => {
            setConnectionStatus('Connected');
            Alert.alert("Connected", "Remote is ready.");
        });

        androidRemote.on('error', (error: Error) => {
            Alert.alert("Error", error.toString());
        });

        androidRemote.on('unpaired', () => {
            setConnectionStatus('Unpaired');
            Alert.alert("Unpaired", "The device has been unpaired.");
        });

        
        console.log('Before start()');
        androidRemote.start().catch((error: Error) => {
            Alert.alert("Connection Error", error.message);
        });

        return () => { 
        };  // Cleanup on component unmount

    }, []);

    const handlePairingCodeSubmit = () => {
      if (!androidRemote)
        return;
        androidRemote.sendCode(code);
    };

    const handleCommandSend = (cmd) => {
      if (!androidRemote)
        return;

        if (cmd in RemoteKeyCode) {
            androidRemote.sendKey(RemoteKeyCode[cmd], RemoteDirection.SHORT);
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
            {/* You can expand below for more buttons for different commands */}
            <Button title="Mute" onPress={() => handleCommandSend('KEYCODE_MUTE')} />
        </View>
    );
}

export default App;
