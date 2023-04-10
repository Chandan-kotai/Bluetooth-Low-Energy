import { Button, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import useBLE from './useBLE'

const BluetoothPlx = () => {
    const [isModal, setIsModal] = useState(false);

    const { requestPermissions, scanForDevices, allDevices, connectToDevice } = useBLE();

    const connectDevice = async () => {
        requestPermissions((isGranted) => {
            if (isGranted) {
                scanForDevices();
                setIsModal(true);
                // console.log(allDevices);
            }
        })
    }

    const disableModal =()=>{
        connectToDevice();
        setIsModal(false);
    }

    useEffect(()=>{

    }, [])

    return (
        <View>
            <Button title={"Connect"} onPress={connectDevice} />

            <Modal
                animationType='fade'
                visible={isModal}
                transparent={true}
            >
                <View style={styles.ModalWrap}>
                    <Text style={{ fontSize: 16, color: "#000", marginVertical: 30, fontWeight: "bold", textAlign: "center" }}>
                        {allDevices[0]?.name}
                    </Text>

                    <TouchableOpacity style={styles.modalButton} onPress={disableModal}>
                        <Text style={styles.btnText}>Connect</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default BluetoothPlx;

const styles = StyleSheet.create({
    ModalWrap: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 7,
        paddingBottom: 20,
        paddingHorizontal: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignSelf: "center",
        width: 300,
        marginVertical: 310,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        margin: 6,
        textAlign: 'center',
        textTransform: "uppercase",
    },
    modalButton: {
        alignItems: 'center',
        paddingHorizontal: 40,
        backgroundColor: "#2D75FF",
        borderRadius: 3
    },
});
