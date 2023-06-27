import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPost } from "../nestedScreens/DefaultScreenPosts";
import { MapScreen } from "../nestedScreens/MapScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
const NestedScreen = createStackNavigator()
export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPost}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
    </NestedScreen.Navigator>
  );
};
