import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native'
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const limitRestaurants = 3
export default function Restaurants() {
    const [user, setUser] = useState(null)
    const navigation = useNavigation();
    const [totalRestaurants, setTotalRestaurants] = useState(0)
    console.log({ totalRestaurants })


    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        })
    }, [])

    useEffect(() => {
        db.collection('restaurants').get().then((snap) => {
            setTotalRestaurants(snap.size)
            console.log({ count: snap.size })
        })

        const resultRestaurants = [];

        db.collection('restaurants')
            .orderBy("createAt", "desc")
            .limit(limitRestaurants)
            .get()
            .then((response) => {
                console.log({ response })
            })

    }, [])

    return (
        <View style={styles.viewBody}>
            <Text>Restaurantes aqui</Text>
            {user && (
                <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("addRestaurant")}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
});
