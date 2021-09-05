import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import * as firebase from 'firebase'

export default function UserLogged() {
    return (
        <View>
            <Text>User Logged</Text>
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={() => firebase.auth().signOut()}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    viewUserInfo: {
      minHeight: "100%",
      backgroundColor: "#f2f2f2",
    },
    btnCloseSession: {
      marginTop: 30,
      borderRadius: 0,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#e3e3e3",
      borderBottomWidth: 1,
      borderBottomColor: "#e3e3e3",
      paddingTop: 10,
      paddingBottom: 10,
    },
    btnCloseSessionText: {
      color: "#00a680",
    },
  })  