import React from 'react'
import { NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Restaurants from '../screens/Restaurants'
import Favorites from '../screens/Favorites'
import TopRestaurants from '../screens/TopRestaurants'
import Search from '../screens/Search'
import Account from '../screens/Account'

const Tab = createBottomTabNavigator();

export default function Navigation () {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
        name='restaurants'
        component={Restaurants}
        options={{ title:'Restaurantes' }}
        />
        <Tab.Screen
        name='favorites'
        component={Favorites}
        options={{ title:'Favoritos' }}
        />
        <Tab.Screen
        name='topRestaurants'
        component={TopRestaurants}
        options={{ title:'Top Restuaurantes' }}
        />
        <Tab.Screen
        name='search'
        component={Search}
        options={{ title:'Search' }}
        />
        <Tab.Screen
        name='account'
        component={Account}
        options={{ title:'Account' }}
       />

      </Tab.Navigator>
    </NavigationContainer>
  )
}
