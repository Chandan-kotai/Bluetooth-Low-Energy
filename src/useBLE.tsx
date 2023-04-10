import { PermissionsAndroid } from 'react-native'
import { BleError, BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { useState } from 'react'
import { atob } from 'react-native-quick-base64';


type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

const dvc_char = "F5 0F 00 04 5F 3B";
const dvc_PIN = "30 37 33 32"; // 0732

interface BluetoothLowEnergyApi {
    requestPermissions(callback: PermissionCallback): Promise<void>;
    connectToDevice(device: Device): Promise<void>;
    scanForDevices(): void;
    allDevices: Device[];
    currentDevice: Device | null;
    lockStatus: any | null;
}

export default function useBLE(): BluetoothLowEnergyApi {
    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [currentDevice, setConnectedDevice] = useState<Device | null>(null);
    const [lockStatus, setLockStatus] = useState<any | null>(null);

    // Check fo permission
    const requestPermissions = async (callback: PermissionCallback) => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Incage™ Smart Lock",
                message: 'Incage™ needs to access your Location',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        callback(granted === PermissionsAndroid.RESULTS.GRANTED);
    }


    // check for duplicate device
    const isDuplicateDevice = (devices: Device[], nextDevice: Device) => {
        return devices.findIndex(device => nextDevice.id === device.id) > -1
    }


    // scan for peripheral devices
    const scanForDevices = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("Error=>", error);
            }
            if (device && device.name?.includes("SN:0000")) {
                setAllDevices((prevState) => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [
                            ...prevState,
                            device
                        ];
                    }
                    return prevState;
                })
            }
        })
    }

    // connect to a device
    const connectToDevice = async (device: Device) => {
        // console.log("connect to device", device);
        try {
            const deviceConnection = await bleManager.connectToDevice(allDevices[0]?.id);
            setConnectedDevice(deviceConnection);
            console.log("connect to device", deviceConnection);
            bleManager.stopDeviceScan();
            await deviceConnection.discoverAllServicesAndCharacteristics();
            startStreamingData(allDevices[0]);
        } catch (err) {
            console.log("Error While Connecting!", err);
        }
    }

    // streaming data with the device
    const startStreamingData = async (device: Device) => {
        // console.log("startStreamingData=>", device);
        if (allDevices[0]) {
            device.monitorCharacteristicForService(allDevices[0]?.id, 'F5 0F 00 04 5F 3B 30 37 33 32', checkDeviceStatus)
        } else {
            console.log("No Device Connected!");
        }
    }

    // check device Status
    const checkDeviceStatus = (error: BleError | null, characteristic: Characteristic | null) => {
        if(error){
            console.error(error);
            return;
        }else if(characteristic?.value){
            console.error("No Characteristic Found!");
            return;
        }

        const rawData = atob(characteristic.value);
        console.log("received data", rawData);
        
    }

    return {
        requestPermissions,
        connectToDevice,
        scanForDevices,
        allDevices,
        currentDevice,
        lockStatus
    }
}