import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native"
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
export const CommentsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather
            name="arrow-left"
            size={24}
            color="black"
            onPress={() => navigation.navigate("DefaultScreen")}
          />
          <Text style={styles.headerText}>Комментарии</Text>
        </View>
        <View style={styles.formComments}>
          <TextInput style={styles.inputForm} placeholder="Комментировать..." />
          <View style={styles.submitComments}>
            <AntDesign name="arrowup" size={20} color="#FFFFFF" />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: "auto",
  },
  headerText: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputForm: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 100,
    height: 50,
    padding: 16,
    fontSize: 16,
    marginTop: 16,
    borderColor: "#E8E8E8",
    fontFamily: "Roboto-Regular",
  },
  formComments: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  submitComments: {
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    position: 'absolute',
    right: 8,
    top: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
});