import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
const initialState = {
  title: "",
  map: "",
};
export const CreatePostScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isShowBtn, setIsShowBtn] = useState(false);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);
  const keyboardHide = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      setIsShowBtn(false);
    }, 20);
  };

  useEffect(() => {
    (async () => {
      const location = await Location.requestForegroundPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
       const coords = {
         latitude: location.coords.latitude,
         longitude: location.coords.longitude,
       };
       await MediaLibrary.createAssetAsync(uri);
       setPhoto(uri);
       setLocation(coords);
    }
  };
  const sendInfo = () => {
    navigation.navigate("DefaultScreen", {
      ...state,
      photo: photo
    });
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Profile")}
          />
          <Text style={styles.headerText}>Создать публикацию</Text>
        </View>
        <View style={styles.mainContainer}>
          <Camera style={styles.camera} ref={setCameraRef}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 70, width: 70 }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.fleshImg} onPress={takePhoto}>
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          <Text style={styles.updateText}>Загрузите фото</Text>
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                placeholder="Название..."
                value={state.title}
                onFocus={() => setIsShowBtn(true)}
                onEndEditing={keyboardHide}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, title: value }))
                }
              />
              <View>
                <Feather
                  name="map-pin"
                  size={18}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={{ ...styles.input, paddingLeft: 28 }}
                  placeholder="Местность..."
                  value={state.map}
                  onFocus={() => setIsShowBtn(true)}
                  onEndEditing={keyboardHide}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, map: value }))
                  }
                />

                <TouchableOpacity
                  style={{
                    ...styles.btnPublish,
                    backgroundColor: state.title ? "#FF6C00" : "#F6F6F6",
                  }}
                  activeOpacity={0.8}
                  onPress={sendInfo}
                  disabled={!state.title}
                >
                  <Text
                    style={{
                      ...styles.textPublish,
                      color: state.title ? "#FFF" : "#BDBDBD",
                    }}
                  >
                    Опубликовать
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        <TouchableOpacity
          style={{
            ...styles.deletePublish,
            display: isShowBtn ? "none" : "flex",
          }}
          activeOpacity={0.8}
        >
          <Feather name="trash-2" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  header: {
    paddingEnd: 16,
    paddingStart: 16,
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 42,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    marginLeft: "auto",
    fontSize: 17,
    color: "#212121",
    marginRight: "auto",
  },
  camera: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  updateText: {
    marginTop: 8,
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 48,
    fontFamily: "Roboto",
  },
  input: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: 32,
    borderBottomColor: "#E8E8E8",
    // flex: 1,
  },
  btnPublish: {
    // backgroundColor: "#F6F6F6",
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginBottom: "auto",
  },

  fleshImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    alignItems: "center",
    justifyContent: "center",
  },
  deletePublish: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    left: 5,
    top: 8,
    zIndex: 1,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    borderColor: "#FF6C00",
    borderWidth: 1,
    height: 70,
    width: 70,
  },
  textPublish: {
    fontFamily: "Roboto",
  },
});
