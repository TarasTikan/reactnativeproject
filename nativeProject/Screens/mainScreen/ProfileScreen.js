import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
export const ProfileScreen = () => {
  const dispatch = useDispatch()
    const signOutUser = () => {
      dispatch(authSignOutUser());
    };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg-defolt.jpg")}
        style={styles.image}
      >
        <View style={styles.userContainer}>
          <View style={styles.userContainerImage}>
            <Image
              source={require("../../assets/images/Rectangle-22.jpg")}
              style={styles.userImg}
            />
            <View style={styles.deleteImg}>
              <AntDesign name="close" size={16} color="#BDBDBD" />
            </View>
          </View>
          <Feather
            style={styles.icons}
            name="log-out"
            size={24}
            color="#BDBDBD"
            onPress={signOutUser}
          />
          <Text style={styles.nameUser}>Natali Romanova</Text>
          <View style={styles.postsUser}>
            <Image
              source={require("../../assets/images/Post1.jpg")}
              style={styles.postImg}
            />
            <Text style={styles.titlePost}>Лес</Text>
            <View style={styles.infoPost}>
              <Feather name="message-circle" size={24} color="#FF6C00" />
              <Text style={styles.socInfo}>8</Text>
              <Feather name="thumbs-up" size={24} color="#FF6C00" />
              <Text style={{ ...styles.socInfo, marginRight: "auto" }}>
                153
              </Text>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text
                style={{
                  ...styles.socInfo,
                  textDecorationLine: "underline",
                  textDecorationColor: "#000",
                }}
              >
                Ukraine
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  userContainer: {
    height: 570,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  userContainerImage: {
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -55,
    borderTopLeftRadius: 16,
  },
  userImg: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  nameUser: {
    marginTop: 67,
    fontSize: 30,
    color: "#212121",
    marginBottom: 33,
  },
  icons: {
    marginLeft: "auto",
  },
  deleteImg: {
    height: 25,
    width: 25,
    position: "absolute",
    left: 105,
    bottom: 11,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    backgroundColor: "#ffff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  postImg: {
    height: 240,
    width: 343,
    borderRadius: 8,
  },
  titlePost: {
    marginTop: 8,
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
  },
  infoPost: {
    flexDirection: "row",
    textAlign: "left",
  },
  socInfo: {
    marginLeft: 8,
    marginRight: 24,
    color: "#212121",
    fontSize: 16,
  },
});
