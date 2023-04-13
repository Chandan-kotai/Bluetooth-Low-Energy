import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert, PermissionsAndroid, Button, NativeModules, NativeEventEmitter, FlatList } from 'react-native'
import React from 'react'
// import BleManager from "react-native-ble-manager"
// import BluetoothManager from 'react-native-bluetooth-classic'
import BluetoothClassicComp from './src/BluetoothClassicComp'
import BluetoothPlx from './src/BluetoothPlx'
import BleManagerV from './src/BleManagerV'
import ScanScreen from './src/ScanScreen'


const App = ({ navigation }) => {
  // const BleManagerModule = NativeModules.BleManager;
  // const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  // const requestBluetoothPermission = async () => {
  //   try {
  //     const grantedLocation = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Incage™ Smart Lock",
  //         message: 'Incage™ needs to access your Location',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     )

  //     if (
  //       grantedLocation === PermissionsAndroid.RESULTS.GRANTED) {

  //       BleManager.checkState().then(state => console.log(`current BLE state = '${state}'.`));

  //       BleManager.enableBluetooth()
  //         .then(() => {
  //           // Success code
  //           console.log("The bluetooth is already enabled or the user confirm");
  //         })
  //         .catch((error) => {
  //           // Failure code
  //           console.log("The user refuse to enable bluetooth");
  //         });


  //       BleManager.start({ showAlert: false })
  //         .then(() => {
  //           // Success code
  //           console.log("Module initialized");
  //         });

  //       BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
  //         // Success code
  //         console.log("Discovered peripherals: ", peripheralsArray);
  //         const deviceList = peripheralsArray.filter(item => item?.advertising?.isConnectable && item?.name !== null)
  //         setDevices(deviceList);

  //         deviceList.map(item => console.log(item?.advertising))

  //         // console.log("Discovered peripherals: ", deviceList); "E1:9B:EF:77:7E:3E"
  //       });

  //       BleManager.scan([], 10).then(() => {
  //         // Success code
  //         console.log("Scan initialized");
  //       });

  //     } else {
  //       Alert.alert("Permission Denied!!")
  //     }
  //   } catch (error) {
  //     Alert.alert("Error!!")
  //   }
  // }

  // const requestBluetoothClassicPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Incage™ Smart Lock',
  //         message: 'Incage™ needs to access your Location',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Initialize the BluetoothManager object
  //       const manager = new BluetoothManager();
  //       console.log("debug=>", granted);

  //       // Check if Bluetooth is enabled
  //       manager.isBluetoothEnabled().then(isEnabled => {
  //         if (!isEnabled) {
  //           // Turn on Bluetooth
  //           manager.enableBluetooth().then(() => {
  //             console.log('Bluetooth turned on');
  //           }).catch(err => {
  //             console.log('Error turning on Bluetooth:', err);
  //           });
  //         }
  //       }).catch(err => {
  //         console.log('Error checking Bluetooth status:', err);
  //       });

  //       // Scan for devices
  //       manager.startScan().then(() => {
  //         console.log('Scanning for Bluetooth devices...');
  //       }).catch(err => {
  //         console.log('Error starting Bluetooth scan:', err);
  //       });

  //       // Listen for scanned devices
  //       manager.onDeviceFound(device => {
  //         console.log('Found Bluetooth device:', device);
  //       });
  //     }
  //   } catch (err) {
  //     Alert.alert('Error!!');
  //   }
  // };

  // const requestAccessFineLocationPermission = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //     {
  //       title: 'Access fine location required for discovery',
  //       message:
  //         'In order to perform discovery, you must enable/allow ' +
  //         'fine location access.',
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'OK',
  //     }
  //   );
  //   console.log(granted);
  //   return granted === PermissionsAndroid.RESULTS.GRANTED;
  // };

  // console.log("filter devices=>", devices);


  return (
    <SafeAreaView style={styles.parent}>
      {/* <BluetoothClassicComp /> */}
      {/* <BluetoothPlx/> */}
      <BleManagerV/>
      {/* <ScanScreen /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
  },
})


export default App
