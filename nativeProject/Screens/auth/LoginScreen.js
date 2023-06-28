import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";
const initialState = {
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();
export const LoginScreen = ({ navigation }) => {
  const [isShowKeyBoard, setShowKeyBoard] = useState(false);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch()
  const keyboardHide = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
  };
  const handleSubmit = () => {
    setShowKeyBoard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSignInUser(state))
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bg-defolt.jpg")}
          style={styles.image}
        >
          <View
            style={{
              ...styles.formContainer,
              paddingBottom: isShowKeyBoard ? 0 : 78,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.form}>
                <Text style={styles.textRegist}>Войти</Text>
                <TextInput
                  style={styles.inputForm}
                  placeholder="Адрес электронной почты"
                  onFocus={() => setShowKeyBoard(true)}
                  onEndEditing={keyboardHide}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
                <TextInput
                  style={{
                    ...styles.inputForm,
                    marginBottom: isShowKeyBoard ? 32 : 0,
                  }}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  onEndEditing={keyboardHide}
                  onFocus={() => setShowKeyBoard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
                <TouchableOpacity
                  style={{
                    ...styles.buttonSign,
                    display: isShowKeyBoard ? "none" : "flex",
                  }}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.btnText}>Войти</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    ...styles.isSignText,
                    display: isShowKeyBoard ? "none" : "flex",
                  }}
                >
                  Нет аккаунта?
                  <Text
                    style={{
                      ...styles.isSignText,
                      display: isShowKeyBoard ? "none" : "flex",
                      color: "#FF6C00",
                      textDecorationLine: "underline",
                    }}
                  >
                    Зарегистрироваться
                  </Text>
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
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
  form: {
    marginHorizontal: 16,
    justifyContent: "flex-end",
  },
  inputForm: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    padding: 16,
    fontSize: 16,
    marginTop: 16,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
  },
  buttonSign: {
    marginTop: 43,
    height: 51,
    fontSize: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  isSignText: {
    color: "#1B4371",
    marginHorizontal: 54,
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  textRegist: {
    fontSize: 30,
    color: "#212121",
    alignSelf: "center",
    marginBottom: 16,
    fontFamily: "Roboto-Medium",
  },
  formContainer: {
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: "flex-end",
  },
});
