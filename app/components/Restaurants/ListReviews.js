import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { map } from "lodash";

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export default function ListReviews(props) {
  const { navigation, idRestaurant } = props;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  })

  return (
    <View>
      <Text>list view</Text>
      {userLogged ? (
        <Text>yes</Text>
      ) : (
        <View>
          <Text>Para escribir comentarios, tienes que estar logueado</Text>

        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#00a680",
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#e3e3e3",
    borderBottomWidth: 1,
  },
  viewImageAvatar: {
    marginRight: 15,
  },
  imageAvatarUser: {
    width: 50,
    height: 50,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
