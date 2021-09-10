import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"
import Loading from "../../components/Loading"
import Carousel from "../../components/Carousel"

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const { id, name } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [rating, setRating] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();

    navigation.setOptions({ title: name })

    useEffect(() => {
        db.collection('restaurants')
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data()
                data.id = response.id
                setRestaurant(data)
            })

    }, [])

    if (!restaurant) return <Loading isVisible={true} text='Cargando ...' />

    return (
        <ScrollView style={styles.viewBody}>
            <Carousel
                arrayImages={restaurant.images}
                height={250}
                width={screenWidth}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    viewRestaurantTitle: {
        padding: 15,
    },
    nameRestaurant: {
        fontSize: 20,
        fontWeight: "bold",
    },
    descriptionRestaurant: {
        marginTop: 5,
        color: "grey",
    },
    rating: {
        position: "absolute",
        right: 0,
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 25,
    },
    restaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    containerListItem: {
        borderBottomColor: "#d8d8d8",
        borderBottomWidth: 1,
    },
    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15,
    },
});
