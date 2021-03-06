import React, { useState, useEffect, useCallback, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Rating, ListItem, Icon } from "react-native-elements";
import { map } from 'lodash'
import { useFocusEffect } from "@react-navigation/native"
import { useNavigation, useRoute } from "@react-navigation/native"
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading"
import Carousel from "../../components/Carousel"
import Map from "../../components/Map"
import ListReviews from "./../../components/Restaurants/ListReviews"

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
    const navigation = useNavigation()
    const route = useRoute()

    const { id, name } = route.params;
    const [restaurant, setRestaurant] = useState(null)
    const [rating, setRating] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const toastRef = useRef();

    navigation.setOptions({ title: name })

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    });

    useFocusEffect(
        useCallback(() => {
            db.collection("restaurants")
                .doc(id)
                .get()
                .then((response) => {
                    const data = response.data();
                    data.id = response.id;
                    setRestaurant(data);
                    setRating(data.rating);
                });
        }, [])
    );

    useEffect(() => {
        if (userLogged && restaurant) {
            db.collection("favorites")
                .where("idRestaurant", "==", restaurant.id)
                .where("idUser", "==", firebase.auth().currentUser.uid)
                .get()
                .then((response) => {
                    if (response.docs.length === 1) {
                        setIsFavorite(true);
                    }
                });
        }
    }, [userLogged, restaurant]);

    const addFavorite = () => {
        if (!userLogged) {
            toastRef.current.show(
                "Para usar el sistema de favoritos tienes que estar logeado"
            );
        } else {
            const payload = {
                idUser: firebase.auth().currentUser.uid,
                idRestaurant: restaurant.id,
            };

            db.collection("favorites")
                .add(payload)
                .then(() => {
                    setIsFavorite(true);
                    toastRef.current.show("Restaurante a??adido a favoritos");
                })
                .catch(() => {
                    toastRef.current.show("Error al a??adir el restaurnate a favoritos");
                });
        }
    }

    const removeFavorite = () => {
        // tengo que pedir primero el id del documento de favorites para poder actualizarlo (borarrlo)
        // no puedo hacerlo directamente con un where?
        // sino puedo guardarlo en un estado, y si lo tengo lo uso, sino pido, solo ser??a buna opcion si le da seguido a a??adir quitar y dem??s, si le da cuando vuelve a la pag no tiene sentido
        db.collection("favorites")
            .where("idRestaurant", "==", restaurant.id)
            .where("idUser", "==", firebase.auth().currentUser.uid)
            .get()
            .then((response) => {
                response.forEach((doc) => {
                    const idFavorite = doc.id;
                    db.collection("favorites")
                        .doc(idFavorite)
                        .delete()
                        .then(() => {
                            setIsFavorite(false);
                            toastRef.current.show("Restaurante eliminado de favoritos");
                        })
                        .catch(() => {
                            toastRef.current.show(
                                "Error al eliminar el restaurante de favoritos"
                            );
                        });
                });
            });
    }

    if (!restaurant) return <Loading isVisible={true} text='Cargando ...' />

    return (
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite}
                    color={isFavorite ? "#f00" : "#000"}
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <Carousel
                arrayImages={restaurant.images}
                height={250}
                width={screenWidth}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                address={restaurant.address}
            />
            <ListReviews
                idRestaurant={id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}

function TitleRestaurant(props) {
    const { name, description, rating } = props;

    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    );
}


function RestaurantInfo(props) {
    const { location, name, address } = props;

    // mocked image for tutorial purposes
    const listInfo = [
        {
            text: address,
            iconName: "map-marker",
            iconType: "material-community",
            action: null,
        },
        {
            text: "111 222 333",
            iconName: "phone",
            iconType: "material-community",
            action: null,
        },
        {
            text: "xAgustin93@gmail.com",
            iconName: "at",
            iconType: "material-community",
            action: null,
        },
    ];

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Informaci??n sobre el restaurante
        </Text>
            <Map location={location} name={name} height={100} />
            {map(listInfo, (item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680",
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    );
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
