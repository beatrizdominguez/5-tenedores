import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";


export default function AddRestaurantForm(props) {
    const { toastRef, setIsLoading } = props;
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const navigation = useNavigation()
    const [imagesSelected, setImagesSelected] = useState([])


    const createRestaurant = () => {
        console.log(`create`)
    }

    return (
        <ScrollView style={styles.scrollView}>
            <Text>{imagesSelected.toString()}</Text>
            <FormAdd
                setName={setName}
                setAdress={setAddress}
                setDescription={setDescription}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title='Crear restaurante'
                buttonStyle={styles.btnAddRestaurant}
                onPressIn={createRestaurant}
            />
        </ScrollView>
    )
}

function FormAdd(props) {
    console.log({ props })
    const {
        setName,
        setAddress,
        setDescription,
        setIsVisibleMap,
        locationRestaurant,
    } = props;

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={(e) => setName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={styles.input}
                onChange={(e) => setAddress(e.nativeEvent.text)}
            // rightIcon={{
            //     type: "material-community",
            //     name: "google-maps",
            //     color: locationRestaurant ? "#00a680" : "#c2c2c2",
            //     onPress: () => setIsVisibleMap(true),
            // }}
            />
            <Input
                placeholder="Descripcion del restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setDescription(e.nativeEvent.text)}
            />
        </View>
    );
}

function UploadImage(props) {
    const { toastRef, imagesSelected, setImagesSelected } = props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        )

        const resultPermissionLibrary = resultPermission.permissions.mediaLibrary.status;

        if (resultPermissionLibrary === "denied") {
            toastRef.current.show(
                "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
                3000
            );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            })

            if (result.cancelled) {
                toastRef.current.show("Has cerrado la selección de imagen");
            } else {
                console.log(`la imagen está seleccionada`)
                setImagesSelected([...imagesSelected, result.uri])
            }
        }
    }

    return (
        <View style={styles.viewImages}>
            {size(imagesSelected) < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            {map(imagesSelected, (imageUri, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{ uri: imageUri }}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20,
    },
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
    mapStyle: {
        width: "100%",
        height: 550,
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d",
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680",
    },
});
