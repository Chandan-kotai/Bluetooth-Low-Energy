import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import BleManager from 'react-native-ble-manager';

const services = [
    {
        "uuid": "1800"
    },
    {
        "uuid": "1801"
    },
    {
        "uuid": "180a"
    },
    {
        "uuid": "fff0"
    }
]

const BleManagerV = () => {
    const [devices, setDevices] = useState({});

    const requestPermissions = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Incage™ Smart Lock",
                message: 'Incage™ needs to access your Location',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );

        // Initialize the BLE manager
        BleManager.start({ showAlert: false });

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            // Start scanning for nearby BLE devices
            // BleManager.scan([], 5, true).then(() => {
            //     console.log('Scan started');

            // Discover available devices
            BleManager.getDiscoveredPeripherals().then((peripherals) => {
                // Update the state with the list of scanned devices
                const list = peripherals.filter(device => device.name === "SN:0000101591");
                setDevices(list[0]);
                console.log('Scanned Devices=>', devices);

                // Connect to the BLE device
                BleManager.connect(devices.id).then(() => {
                    console.log('Connected to device', devices.id);

                    // Check if the SPP service is available on the device
                    BleManager.retrieveServices(devices.id)
                        .then((services) => {
                            console.log('Available services:', services);

                            const sppService = services.characteristics.map((service) => service);

                            if (sppService) {
                                console.log('SPP service found', sppService);
                                sppService.map((item, index) => console.log(`service ${index} : `, item))

                                
                            } else {
                                console.log('SPP service not found');
                            }
                        })
                        .catch((error) => {
                            console.log("retrieveServices error", error);
                        });
                }).catch((error) => {
                    console.log(error);
                });
            });

            // end scan
            // });

            // Stop scanning when the component unmounts
            return () => {
                BleManager.stopScan().then(() => {
                    console.log('Scan stopped');
                });
            };

        }
    }

    return (
        <View>
            <Button title={"connect"} onPress={requestPermissions} />
        </View>
    )
}
export default BleManagerV

const styles = StyleSheet.create({})