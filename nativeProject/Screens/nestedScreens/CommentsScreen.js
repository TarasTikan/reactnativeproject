import { FlatList, Image, Keyboard, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
export const CommentsScreen = ({route, navigation}) => {
const [comment, setComment] = useState("");
const [sendedComment, setSendedComment] = useState("");
  const [allComments, setAllComments] = useState([]);
const {login} = useSelector((state)=>state.auth)
const {postId} = route.params
  const keyboardHide = () => {
    Keyboard.dismiss();
  };
   const createComment = async () => {
    const docRef = await doc(db, `posts/${postId}`);

    const colRef = await collection(docRef, "comments");
    addDoc(colRef, {
      comment,
      login,
    });
    setSendedComment(comment);
    setComment("");
    Keyboard.dismiss();
   };
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(
      collection(db, `posts/${postId}/comments`)
    );
    const allCommentsArray = [];

    querySnapshot.forEach((doc) => {
      allCommentsArray.push({ ...doc.data(), id: doc.id });
    });
    setAllComments(allCommentsArray);
  };
  useEffect(()=>{getAllPosts()},[])
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
        <SafeAreaView style={styles.containerListComments}>
          <FlatList
            data={allComments}
            renderItem={({ item }) =>
                <View style={styles.containerComment}>
                  <View style={styles.textContainerCommentOwn}>
                    <Text style={styles.textComment}>{item.comment}</Text>
                  </View>

                  <Image source={item.avatar} style={styles.imageCommentOwn} />
                </View>
         
            }
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.formComments}>
            <TextInput
              style={styles.inputForm}
              placeholder="Комментировать..."
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={styles.submitComments}
              onPress={createComment}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
   containerComment: {
    borderRadius: 5,
    flexDirection: 'row',

    marginHorizontal: 16,
    marginBottom: 24,
  },
  textContainerCommentOwn: {
    flex: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  textContainerCommentOther: {
    flex: 1,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  imageCommentOwn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginLeft: 16,
  },
  imageCommentOther: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 16,
  },
  textComment: {
    fontSize: 13,
    lineHeight: 18,
  },
  containerListComments: {
    marginTop: 34,
    flex: 1,}
});