import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Restaurants from '../screens/Restaurants/Restaurants'
import AddRestaurnt from '../screens/Restaurants/AddRestaurant'
import Restaurant from '../screens/Restaurants/Restaurant'
import AddReviewRestaurant from '../screens/Restaurants/AddReviewRestaurant'

const Stack = createStackNavigator()

export default function RestaurantsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='home'
                component={Restaurants}
                options={{ title: 'Restaurantes' }}
            />
            <Stack.Screen
                name='addRestaurant'
                component={AddRestaurnt}
                options={{ title: 'Añade un nuevo restaurante' }}
            />
            <Stack.Screen
                name='restaurant'
                component={Restaurant}
            // options={{title:''}} // nombre dinámico dentro del componente
            />
            <Stack.Screen
                name='addReviewRestaurant'
                component={AddReviewRestaurant}
                options={{ title: 'Nuevo comentario' }}
            />
        </Stack.Navigator>
    )
}