import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useEffect, useState } from "react";

export const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Публикации</Text>
        <Feather
          style={styles.icons}
          name="log-out"
          size={24}
          color="#BDBDBD"
        />
      </View>
      <View style={styles.post}>
        <Image
          source={require("../../assets/images/Rectangle-22.jpg")}
          style={styles.postUserImg}
        />
        <View>
          <Text style={{ ...styles.textPost, fontSize: 13, color: "#212121" }}>
            Natali Romanova
          </Text>
          <Text style={styles.textPost}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.postsUser}>
            <Image
              source={{uri: item.photo}}
              style={styles.postImg}
            />
            <Text style={styles.titlePost}>{item.title}</Text>
            <View style={styles.infoPost}>
              <TouchableOpacity
                style={styles.commentsPost}
                onPress={() => navigation.navigate("Comments")}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.socInfo, marginRight: "auto" }}>
                  0
                </Text>
              </TouchableOpacity>
              <Feather name="map-pin" size={24} color="#BDBDBD" />
              <Text
                style={{
                  ...styles.socInfo,
                  textDecorationLine: "underline",
                  textDecorationColor: "#000",
                  marginRight: 0,
                  color: "#212121",
                }}
              >
                {item.map}
              </Text>
            </View>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
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
    marginBottom: 32,
  },
  titlePost: {
    marginTop: 8,
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
    marginHorizontal: 16,
  },
  infoPost: {
    flexDirection: "row",
    textAlign: "left",
    marginHorizontal: 16,
  },
  socInfo: {
    marginLeft: 8,
    marginRight: 24,
    color: "#BDBDBD",
    fontSize: 16,
  },
  headerText: {
    marginLeft: "auto",
    fontSize: 17,
    color: "#212121",
    // marginRight: 'auto'
  },
  icons: {
    marginLeft: "auto",
  },
  postUserImg: {
    height: 60,
    width: 60,
    marginRight: 8,
  },
  post: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textPost: {
    fontSize: 11,
    alignItems: "center",

    color: "rgba(33, 33, 33, 0.8)",
  },
  postImg: {
    height: 240,
    width: 343,
    borderRadius: 8,
    alignSelf: "center",
  },
  postsUser: {
    alignContent: "center",
    marginTop: 32,
  },
  commentsPost: {
    flexDirection: "row",
    marginRight: "auto",
  },
});
