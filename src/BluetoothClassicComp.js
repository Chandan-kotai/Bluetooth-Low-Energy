import { StyleSheet, Text, View, SafeAreaView, FlatList, Button, TouchableOpacity, PermissionsAndroid } from 'react-native';
import React, { useState, useEffect } from 'react';
// import BluetoothClassic from 'react-native-bluetooth-classic';
// import RNBluetoothClassic, { BluetoothEventType } from 'react-native-bluetooth-classic';

const BluetoothClassicComp = () => {
    const [deviceId, setDevices] = useState(null);

    const requestBluetoothPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Incage™ Smart Lock",
                    message: 'Incage™ needs to access your Location',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            )

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Bluetooth permission granted");
                // await BluetoothClassic.initialize();

                RNBluetoothClassic.startScan()
                    .then(devices => {
                        console.log('Available devices:', devices);

                        // Connect to a Bluetooth device
                        RNBluetoothClassic.connectToDevice(deviceId)
                            .then(() => {
                                console.log('Connected to device:', deviceId);

                                // Send data to the connected device
                                RNBluetoothClassic.writeToDevice(data)
                                    .then(() => {
                                        console.log('Data sent successfully.');
                                    })
                                    .catch(error => {
                                        console.log('Error sending data:', error);
                                    });

                                // Listen for incoming data from the connected device
                                RNBluetoothClassic.onDataReceived(data => {
                                    console.log('Received data:', data);
                                });
                            })
                            .catch(error => {
                                console.log('Error connecting to device:', error);
                            });
                    })
                    .catch(error => {
                        console.log('Error scanning for devices:', error);
                    });

            } else {
                console.log("else error =>");
            }
        } catch (err) {
            console.log("catch error =>", err);
        }
    }
    // Disconnect from the currently connected device
    // BluetoothClassic.disconnectFromDevice().then(() => {
    //     console.log('Disconnected from device.');
    // });

    useEffect(() => { }, [])

    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.bodyWrap}>
                <View style={{ marginTop: 40 }}>
                    {/* <CustomButton btnText={"Tap to Connect"} onPressFunc={requestBluetoothPermission} /> */}
                    <Button title={"Scan Devices"} onPress={requestBluetoothPermission} />
                    {/* <Button title={"disconnect"} onPress={() => {
            
          }} /> */}
                </View>
                {/* <View style={{ marginTop: 20 }}>
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item?.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity>
                                    <View style={{ marginHorizontal: 10, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 40, marginVertical: 5 }}>
                                        <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Name : {item.name}</Text>
                                        <TouchableOpacity style={{ backgroundColor: "red", width: 80 }}>
                                            <Text style={{ textAlign: "center", paddingVertical: 5 }}>Disconnect</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View> */}
            </View>
        </SafeAreaView>
    )
}

export default BluetoothClassicComp

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        alignItems: "center",
    },
    imageBg: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 10,
        borderRadius: 50,
        marginRight: 15,
        marginTop: 5,
    },
    bodyWrap: {
        alignItems: 'center',
    }
})