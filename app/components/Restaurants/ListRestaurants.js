import React from "react"
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native"
import { Image } from "react-native-elements"
import { size } from "lodash"
import { useNavigation } from "@react-navigation/native"

export default function ListRestaurants(props) {
    const { restaurants, handleLoadMore, isLoading } = props
    const navigation = useNavigation()

    return (
        <View>
            {size(restaurants) > 0 ? (
                <FlatList
                    data={restaurants}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(restaurant) => (
                        <Restaurant
                            restaurant={restaurant}
                        ></Restaurant>
                    )}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurantes</Text>
                </View>

            )}
        </View>
    );
}

function Restaurant(props) {
    const { restaurant } = props
    return (
        <View>
            <Text>restaurante</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    viewRestaurant: {
        flexDirection: "row",
        margin: 10,
    },
    viewRestaurantImage: {
        marginRight: 15,
    },
    imageRestaurant: {
        width: 80,
        height: 80,
    },
    restaurantName: {
        fontWeight: "bold",
    },
    restaurantAddress: {
        paddingTop: 2,
        color: "grey",
    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300,
    },
    notFoundRestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
});
