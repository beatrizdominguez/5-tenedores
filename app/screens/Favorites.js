import React, { useState, useRef, useCallback } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { size } from 'lodash'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import Loading from "../components/Loading";

import { firebaseApp } from "../utils/firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [userLogged, setUserLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reloadData, setReloadData] = useState(false);
    const toastRef = useRef();

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    useFocusEffect(
        useCallback(() => {
            if (userLogged) {
                const idUser = firebase.auth().currentUser.uid;
                db.collection("favorites")
                    .where("idUser", "==", idUser)
                    .get()
                    .then((response) => {
                        const idRestaurantsArray = [];
                        response.forEach((doc) => {
                            idRestaurantsArray.push(doc.data().idRestaurant);
                        });
                        getDataRestaurant(idRestaurantsArray).then((response) => {
                            const restuarants = [];
                            response.forEach((doc) => {
                                const restaurant = doc.data();
                                restaurant.id = doc.id;
                                restuarants.push(restaurant);
                            });
                            setRestaurants(restuarants);
                        });
                    });
            }
            setReloadData(false);
        }, [userLogged, reloadData])
    );

    const getDataRestaurant = (idRestaurantsArray) => {
        const arrayRestaurants = [];
        idRestaurantsArray.forEach((idRestaurant) => {
            const result = db.collection("restaurants").doc(idRestaurant).get();
            arrayRestaurants.push(result);
        });
        return Promise.all(arrayRestaurants);
    };

    if (!userLogged) {
        return <UserNoLogged />;
    }

    if (!restaurants) {
        return <Loading text="Cargando restaurantes" isVisible={isLoading} />
    }

    if (restaurants?.length === 0) {
        return <NotFoundRestaurants />;
    }

    return (
        <View>
            { restaurants ? (
                <View style={styles.viewBody} >
                    <Text>favs here</Text>
                    <Toast ref={toastRef} position="center" opacity={0.9} />
                </View>
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text style={{ textAlign: "center" }}>Cargando restaurantes</Text>
                </View>
            )}
        </View >
    );
}

function NotFoundRestaurants() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}         >
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                No tienes restaurantes en tu lista
        </Text>
        </View>
    );
}

function UserNoLogged(props) {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Icon type="material-community" name="alert-outline" size={50} />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                Necesitas estar logeado para ver esta sección
        </Text>
            <Button
                title="Ir al login"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#00a680" }}
                // si quiero ir a una pantalla no principal de un stack, tengo que llamar al stack y  luego como props al login
                onPress={() => navigation.navigate("account", { screen: "login" })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10,
    },
    restaurant: {
        margin: 10,
    },
    image: {
        width: "100%",
        height: 180,
    },
    info: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff",
    },
    name: {
        fontWeight: "bold",
        fontSize: 30,
    },
    favorite: {
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100,
    },
});
