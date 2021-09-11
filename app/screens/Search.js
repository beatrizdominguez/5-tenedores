import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native"

export default function Search() {
    const navigation = useNavigation()
    const [search, setSearch] = useState("");

    return (
        <View>
            <SearchBar
                placeholder="Busca tu restaurante..."
                onChangeText={(e) => setSearch(e)}
                value={search}
                containerStyle={styles.searchBar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,
    },
});
