import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext, AuthProvider} from './context/AuthProvider';
import LoginScreen from './screens/Auth/LoginScreen';
import * as SecureStore from 'expo-secure-store';
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: true, headerBackTitleVisible: false}}
        >
            <Stack.Screen
                name="Tab"
                component={TabNavigator}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false, headerBackTitleVisible: false}}
        >
            <Stack.Screen
                name="Login Screen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
const HomeScreen = () => {
    return (
        <View>
            <Text>
                Home Screen
            </Text>
        </View>
    );
}
const TweetScreen = () => {
    return (
        <View>
            <Text>
                Tweet Screen
            </Text>
        </View>
    );
}

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home1"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="home" size={size} color={color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        // check if user is logged in or not.
        // Check SecureStore for the user object/token

        SecureStore.getItemAsync('user')
            .then(userString => {
                if (userString) {
                    setUser(JSON.parse(userString));
                }
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="gray"/>
            </View>
        );
    }

    return (
        <>
            {user ? (
                <NavigationContainer>
                    <Drawer.Navigator
                        initialRouteName="Home"
                        screenOptions={{headerShown: true}}
                    >
                        <Drawer.Screen name="Home" component={HomeStackNavigator}/>
                        <Drawer.Screen name="Settings" component={SettingsScreen}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <AuthStackNavigator/>
                </NavigationContainer>
            )}
        </>
    );
}