import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native"
import { FireSQL } from "firesql";
import firebase from "firebase/app";

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });

export default function Search() {
    const navigation = useNavigation()
    const [search, setSearch] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        if (search) {
            fireSQL
                .query(`SELECT * FROM restaurants WHERE name LIKE '${search}%'`)
                .then((response) => {
                    setRestaurants(response);
                });
        }
    }, [search]);

    return (
        <View>
            <SearchBar
                placeholder="Busca tu restaurante..."
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />

            {restaurants.length === 0 ? (
                <NoFoundRestaurants />
            ) : (
                <Text>datos</Text>
                // <FlatList
                //   data={restaurants}
                //   renderItem={(restaurant) => (
                //     <Restaurant restaurant={restaurant} navigation={navigation} />
                //   )}
                //   keyExtractor={(item, index) => index.toString()}
                // />
            )}
        </View>
    )
}

function NoFoundRestaurants() {
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            <Image
                source={require("../../assets/img/no-result-found.png")}
                resizeMode="cover"
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,
    },
});
