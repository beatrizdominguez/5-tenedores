import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListRestaurants from "../../components/Restaurants/ListRestaurants";

const db = firebase.firestore(firebaseApp);

const limitRestaurants = 9

export default function Restaurants() {
    const [user, setUser] = useState(null)
    const navigation = useNavigation();
    const [restaurants, setRestaurants] = useState([])
    const [totalRestaurants, setTotalRestaurants] = useState(0)
    const [startRestaurant, setStartRestaurant] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(useCallback(() => {
        db.collection('restaurants').get().then((snap) => {
            setTotalRestaurants(snap.size)
        })

        const resultRestaurants = [];

        db.collection('restaurants')
            .orderBy("createAt", "desc")
            .limit(limitRestaurants)
            .get()
            .then((response) => {
                setStartRestaurant(response.docs[response.docs.length - 1])

                for (const doc of response.docs) {
                    const restaurant = doc.data()
                    restaurant.id = doc.id;
                    resultRestaurants.push(restaurant)
                }
                setRestaurants(resultRestaurants)
            })
    }, []))


    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        })
    }, [])

    const handleLoadMore = () => {
        const resultRestaurants = [];
        restaurants.length < totalResaturants && setIsLoading(true);

        db.collection("restaurants")
            .orderBy("createAt", "desc")
            .startAfter(startRestaurants.data().createAt)
            .limit(limitRestaurants)
            .get()
            .then((response) => {
                if (response.docs.length > 0) {
                    setStartRestaurants(response.docs[response.docs.length - 1]);
                } else {
                    setIsLoading(false);
                }

                for (const doc of response.docs) {
                    const restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push(restaurant);
                }

                setRestaurants([...restaurants, ...resultRestaurants])
            })
    }

    return (
        <View style={styles.viewBody}>
            <ListRestaurants
                restaurants={restaurants}
            />
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
