/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { PairingDialog } from './components/PairingDialog';
// TO use local package dist instead of src you have to uncomment inside metro.config.js
//import { AndroidRemote, RemoteKeyCode, RemoteDirection } from 'react-native-androidtv-remote';
import { AndroidRemote, RemoteKeyCode, RemoteDirection } from './packages/react-native-androidtv-remote/src';

function App(): React.JSX.Element {
    console.log('Entering App()');

    const [code, setCode] = useState('');
    const [serverAddress, setServerAddress] = useState('192.168.1.102');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [showPairingDialog, setShowPairingDialog] = useState(false);
    const androidRemoteRef = useRef<AndroidRemote | null>(null);
    const previousHostRef = useRef<string>('');
    const certificateRef = useRef<{key: string | null, cert: string | null} | null>(null);
    

    useEffect(() => {
        setCode('');
        return () => {
            if (androidRemoteRef.current) {
                console.log('Here in destructor');
                androidRemoteRef.current.stop();
            }
        };
    }, []);

    const handleConnect = () => {
        setCode('');
        if (connectionStatus === 'Connected') {
            // Disconnect logic
            console.log('Disconnecting current connection');
            if (androidRemoteRef.current) {
                androidRemoteRef.current.stop();
                androidRemoteRef.current = null;
                setConnectionStatus('Disconnected');
            }
            return;
        }

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
                key: certificateRef.current?.key || null,
                cert: certificateRef.current?.cert || null,
                androidKeyStore: 'AndroidKeyStore',
                certAlias: 'lota-remotectl-atv-cert',
                keyAlias: 'lota-remotectl-atv',
            }
        };

        // Check if host has changed and there's an existing connection
        if (androidRemoteRef.current && previousHostRef.current !== host) {
            console.log('Host changed, stopping existing connection');
            androidRemoteRef.current.stop();
            androidRemoteRef.current = null;
        }

        if (!androidRemoteRef.current) {
            console.log('Before instantiating AndroidRemote');

            const androidRemote = new AndroidRemote(host, options);
            androidRemoteRef.current = androidRemote;
            previousHostRef.current = host;

            console.log('After instantiating AndroidRemote');
            
            androidRemoteRef.current.on('secret', () => {
                setShowPairingDialog(true);
                setConnectionStatus('Pairing Needed');
            });

            androidRemoteRef.current.on('ready', () => {
                // Store the certificate before sending code, regardless of pairing success
                const cert = androidRemoteRef.current?.getCertificate();
                if (cert && cert.key && cert.cert && !certificateRef.current) {
                    certificateRef.current = cert;
                    console.log('Certificate stored for future use');
                }
                setConnectionStatus('Connected');
                Alert.alert("Connected", "Remote is ready.");
            });

            androidRemoteRef.current.on('error', (error: Error) => {
                console.log('onError!!!!');
                //Alert.alert("Error", error.toString());
            });

            androidRemoteRef.current.on('unpaired', () => {
                setConnectionStatus('Unpaired');
                Alert.alert("Unpaired", "The device has been unpaired.");
            });

            console.log('Before start()');
            androidRemoteRef.current.start().then(() => {
            }).catch((error: Error) => {
                Alert.alert("Connection Error", error.message);
            });
        } else {
            console.log(`A connection is already in progress... ${androidRemoteRef.current}`);
            //androidRemoteRef.current.stop();
            androidRemoteRef.current.start().catch((error: Error) => {
                Alert.alert("Connection Error", error.message);
            });
        }
    };

    const handlePairingCodeSubmit = async (pairingCode: string | null) => {
        console.log('handlePairingCodeSubmit: ', pairingCode);

        if (!androidRemoteRef.current) {
            console.log('handlePairingCodeSubmit: exiting');
            return;
        }

        if (pairingCode === null) {
            // Handle cancel operation
            await androidRemoteRef.current.cancelPairing()
            console.log('Pairing cancelled');
            setShowPairingDialog(false);
            androidRemoteRef.current.stop();
            androidRemoteRef.current = null;
            setConnectionStatus('Disconnected');
            
            return;
        }

        console.log('androidRemote.sendCode(code): ', pairingCode);
        try {
            const success = await androidRemoteRef.current.sendPairingCode(pairingCode);
            setShowPairingDialog(false);
        } catch (error) {
            console.error('Error during pairing:', error);
            setShowPairingDialog(false);
        }
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
                <Button 
                title={connectionStatus === 'Connected' ? 'Disconnect' : 'Connect'}  
                onPress={handleConnect} 
                />
            </View>
            <PairingDialog
                visible={showPairingDialog}
                onSubmit={(pairingCode) => handlePairingCodeSubmit(pairingCode)}
                onCancel={() => handlePairingCodeSubmit(null)}
            />
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
        borderColor: '#666',  // Darker gray border
        borderWidth: 1,
        marginRight: 10,
        color: '#fff',  // White text for dark theme
        backgroundColor: '#333',  // Dark background
        paddingHorizontal: 10,  // Add padding for better text visibility
        borderRadius: 5,  // Optional: rounded corners
    },
    pairingCodeInput: {
        height: 40,
        borderColor: '#666',  // Darker gray border
        borderWidth: 1,
        marginBottom: 10,
        color: '#fff',  // White text for dark theme
        backgroundColor: '#333',  // Dark background
        paddingHorizontal: 10,  // Add padding for better text visibility
        borderRadius: 5,  // Optional: rounded corners
    }
});

export default App;
