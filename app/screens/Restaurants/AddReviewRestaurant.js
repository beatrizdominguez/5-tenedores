import React, { useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

export default function AddReviewRestaurant(props) {
  const navigation = useNavigation()
  const route = useRoute()
  const { idRestaurant } = route.params;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();


  return (
    <View style={styles.viewBody}>
      <View style={styles.viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Pésimo", "Deficiente", "Normal", "Muy Bueno", "Excelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => {
            setRating(value);
          }}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="Comentario..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "#f2f2f2",
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
