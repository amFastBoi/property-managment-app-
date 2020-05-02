import React from "react";
import { View, Text, StyleSheet, Image, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import firebase from "firebase";
import Fire from "../Fire";


// temporary data until we pull from Firebase
// posts = [
//     {
//         id: "1",
//         name: "Joe McKay",
//         text:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         timestamp: 1569109273726,
//         avatar: require("../assets/lez.jpg"),
//         image: require("../assets/saz.jpg")
//     },
// ];


export default class recommendations extends React.Component {

    state = {
        posts: []
    };

    componentDidMount() {
        this.ref = firebase.firestore();

        this.ref
            .collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
                //gets snapshot of database to show
                posts = [];
                snapshot.forEach(post => {
                    posts.push(post.data());

                    //add each post to the posts array here
                });
                this.setState({ posts });
            });
    }
    
    renderPost = post => {
        let image = <Image source={require("../assets/lez.jpg")} style={styles.avatar}></Image>;

        if (post.user.avatar) {
            image = <Image source={{ uri: post.user.avatar }} style={styles.avatar} />;
        }

        return (
            <View style={styles.feedItem}>
                {image}
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <Text style={styles.name}>{post.user.name}</Text>

                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.post}>{post.text}</Text>
                    <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
                </View>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>The log book</Text>
                    

                </View>
                <ImageBackground source={require("../assets/tempBg.png")} style={{width: '100%', height: '100%'}} > 
                <FlatList
                
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({ item }) => this.renderPost(item)} //Rendering the items from the post array
                    keyExtractor={(_, index) => index.toString()} //Gives each post a unique key
                    showsVerticalScrollIndicator={false}
                ></FlatList>
                </ImageBackground>
            </View>
            
            
        );
    }

    
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#691d48'
       
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#691d48",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#fff"
        
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFFFFF50",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8,
        
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 20,
        fontWeight: "500",
        color: "#07f00b"
    },
    timestamp: {
        fontSize: 11,
        color: "#ffffff",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#ffffff"
    },
    postImage: {
        width: '100%',
        
        height: 300,
        borderRadius: 5,
        marginVertical: 16
    },

    backgroundImage: {
            
        alignItems: "center",
        backgroundColor: '#000000',
        justifyContent: "center",
            flex: 1,
            width: '100%',
            height: '100%',
            // flexDirection: 'column',
            // backgroundColor:'transparent',
            // justifyContent: 'flex-start',
        
        
        },
});
