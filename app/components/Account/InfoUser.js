import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from "firebase"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser (props) {
    const { userInfo, toastRef } = props
    const { photoURL, displayName, email } = userInfo

    const changeAvatar = async () => {
      const resultPermission = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      )
      console.log({ resultPermission })
      const resultPermissionLibrary = resultPermission.permissions.mediaLibrary.status;
      console.log({ resultPermissionCamera: resultPermissionLibrary })

      if (resultPermissionLibrary === "denied") {
        toastRef.current.show("Es necesario aceptar los permisos de la galeria");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        })
        console.log({ result })
      }
    }

      return (
        <View style={styles.viewUserInfo}>
          <Avatar
                rounded
                size="large"
                showEditButton
                containerStyle={styles.userInfoAvatar}
                onEditPress={changeAvatar}
                source={
                    photoURL
                      ? { uri: photoURL }
                      : require("../../../assets/img/avatar-default.jpg")
                  }
            />
            <View>
                <Text style={styles.displayName}>{displayName || 'Anónimo'}</Text>
                <Text>{email || 'Social Login'}</Text>
            </View>
        </View>
      )
}

const styles = StyleSheet.create({
    viewUserInfo: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#f2f2f2",
      paddingTop: 30,
      paddingBottom: 30,
    },
    userInfoAvatar: {
      marginRight: 20,
    },
    displayName: {
      fontWeight: "bold",
      paddingBottom: 5,
    },
  });
  