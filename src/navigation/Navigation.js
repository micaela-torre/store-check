import React, { lazy } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StoreDetails from '../screens/StoreDetails';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { PUBLIC_ROUTES } from '../models/routes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TaskScreen = lazy(() => import('../screens/TaskScreen'));
const headerShown = false;
const getIcon = ({ color, size, name }) => <Icon name={name} color={color} size={size} />;

const HomeStack = () => (
  <Stack.Navigator initialRouteName={PUBLIC_ROUTES.HOME}>
    <Stack.Screen name={PUBLIC_ROUTES.HOME} component={HomeScreen} options={{ headerShown }} />
    <Stack.Screen name={PUBLIC_ROUTES.STORE_DETAILS} component={StoreDetails} options={{ headerShown }} />
    {/* <Stack.Screen name="myTasks" component={TaskScreen} options={{ headerShown }} /> */}
  </Stack.Navigator>
);

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            headerShown,
            tabBarIcon: props => getIcon({ name: 'storefront', ...props }),
          }}
        />
        <Tab.Screen
          name={PUBLIC_ROUTES.MY_TAKS}
          component={TaskScreen}
          options={{
            tabBarLabel: 'My Tasks',
            headerShown,
            tabBarIcon: props => getIcon({ name: 'assignment', ...props }),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
