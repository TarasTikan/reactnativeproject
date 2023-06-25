import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
export const CreatePostScreen = ({navigation}) => {
  const [isShowBtn, setIsShowBtn] = useState(false);
     const keyboardHide = () => {
       
       Keyboard.dismiss();
       setTimeout(()=>{setIsShowBtn(false)},20)
       
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
          <View style={styles.images}>
            <View style={styles.fleshImg}>
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </View>
          </View>
          <Text style={styles.updateText}>Загрузите фото</Text>
          <View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <TextInput
                style={styles.input}
                placeholder="Название..."
                onFocus={() => setIsShowBtn(true)}
                onEndEditing={keyboardHide}
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
                  onFocus={() => setIsShowBtn(true)}
                  onEndEditing={keyboardHide}
                />

                <TouchableOpacity style={styles.btnPublish} activeOpacity={0.8}>
                  <Text style={styles.textPublish}>Опубликовать</Text>
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
  images: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 240,
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
  },
  input: {
    borderBottomWidth: 1,
    height: 35,
    marginBottom: 32,
    borderBottomColor: "#E8E8E8",
    // flex: 1,
  },
  btnPublish: {
    backgroundColor: "#F6F6F6",
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginBottom: 'auto'
  },

  fleshImg: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  deletePublish: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    width: 70,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 20
  },
  icon: {
    position: "absolute",
    left: 5,
    top: 8,
    zIndex: 1,
  },
});
