import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-easy-toast";
import { useNavigation } from '@react-navigation/native'
import Loading from "../../components/Loading";
import AddRestaurantForm from "../../components/Restaurants/AddRestaurantForm";

export default function AddRestaurant(props) {
//   const { navigation } = props
  const [isLoading, setIsLoading] = useState(false)
  const toastRef = useRef()
  const navigation = useNavigation()

  return (
    <View>
      <AddRestaurantForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Creando restaurante" />
    </View>
  );
}
