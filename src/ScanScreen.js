import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import BleManager from 'react-native-ble-manager';

const ScanScreen = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        // Start scanning for BLE devices
        BleManager.start({ showAlert: false });

        // Listen for BLE device discovery events
        BleManager.onBluetoothEnabled(() => console.log('Bluetooth enabled'));
        BleManager.onStateChange((state) => console.log('BLE state:', state));
        BleManager.onNewState(state => console.log('BLE new state:', state));
        BleManager.onPeripheralConnect(peripheral => console.log('Peripheral connected:', peripheral));
        BleManager.onPeripheralDisconnect(peripheral => console.log('Peripheral disconnected:', peripheral));
        BleManager.onPeripheralDiscovered((peripheral) => {
            console.log('Peripheral discovered:', peripheral);
            setDevices(devices => [...devices, peripheral]);
        });

        // Stop scanning when the component unmounts
        return () => {
            BleManager.stopScan();
        };
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log('Selected device:', item)}>
            <View style={{ padding: 16 }}>
                <Text>{item.name || item.id}</Text>
                <Text style={{ color: '#666', marginTop: 4 }}>{item.id}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={devices}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text>No devices found</Text>}
        />
    );
};

export default ScanScreen;
