import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import RestaurantsStack from './RestaurantsStack'
import FavoriteStack from './FavoriteStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='restaurants'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({color}) => screenOptions(route, color),
          tabBarInactiveTintColor: "#646464",
          tabBarActiveTintColor: "#00a680",
        })}
      >
        <Tab.Screen
          name='restaurants'
          component={RestaurantsStack}
          options={{ title: 'Restaurantes' }}
        />
        <Tab.Screen
          name='favorites'
          component={FavoriteStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name='topRestaurants'
          component={TopRestaurantsStack}
          options={{ title: 'Top Restuaurantes' }}
        />
        <Tab.Screen
          name='search'
          component={SearchStack}
          options={{ title: 'Buscar' }}
        />
        <Tab.Screen
          name='account'
          component={AccountStack}
          options={{ title: 'Mi cuenta' }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const screenOptions = (route, color) => {
  let iconName
  switch (route.name) {
    case 'restaurants':
      iconName = 'compass-outline'
      break;
    case 'favorites':
      iconName = 'heart-outline'
      break;
    case 'topRestaurants':
      iconName = 'star-outline'
      break;
    case 'search':
      iconName = 'magnify'
      break;
    case 'account':
      iconName = 'home-outline'
      break;
    default:
      break;
  }
  return (
    <Icon
      type='material-community'
      name={iconName}
      size={22}
      color={color}
    />
  )
}