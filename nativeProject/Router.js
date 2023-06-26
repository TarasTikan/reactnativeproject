import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "./Screens/mainScreen/PostsScreen";
import { CreatePostScreen } from "./Screens/mainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/mainScreen/ProfileScreen";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { CommentsScreen } from "./Screens/mainScreen/CommentsScreen";
import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
export function useRoutes(isAuth) {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Register">
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <MainStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarStyle: { paddingTop: 9 } }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="grid" size={24} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            borderRadius: 20,
            marginLeft: 40,
          },
          tabBarActiveTintColor: "#ffff",
          tabBarInactiveTintColor: "#212121",
        }}
        name="Posts"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <PlusIcon focused={focused} />,
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="plus" size={20} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            borderRadius: 20,
            marginHorizontal: 15,
          },
          tabBarActiveTintColor: "#ffff",
          tabBarInactiveTintColor: "#212121",
        }}
        name="Create"
        component={CreatePostScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarActiveBackgroundColor: "#FF6C00",
          tabBarItemStyle: {
            borderRadius: 20,
            marginRight: 40,
          },
          tabBarActiveTintColor: "#ffff",
          tabBarInactiveTintColor: "#212121",
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{ tabBarItemStyle: { display: "none" }, headerShown: false }}
        name="Comments"
        component={CommentsScreen}
      />
    </Tab.Navigator>
  );
}
