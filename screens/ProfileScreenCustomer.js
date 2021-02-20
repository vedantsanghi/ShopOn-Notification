import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Text,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      emailId: "",
      contact: "",
      docId: "",
      ordersDocId: [],
      requestsDocId: [],
    };
  }
  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection("customers")
      .where("email_id", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          var data = doc.data();
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.contact,
            docId: doc.id,
          });
        });
      });

    var ordersDocId = [];
    db.collection("all_orders")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().buyer_id === email) {
            ordersDocId.push(doc.id);
          }
        });
      });
    this.setState({
      ordersDocId: ordersDocId,
    });

    var requestsDocId = [];
    db.collection("all_requests")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().buyer_id === email) {
            requestsDocId.push(doc.id);
          }
        });
      });
    this.setState({
      requestsDocId: requestsDocId,
    });
  };

  componentDidMount() {
    this.getUserDetails();
  }

  updateUserDetails = () => {
    db.collection("customers").doc(this.state.docId).update({
      email_id: this.state.emailId,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address: this.state.address,
      contact: this.state.contact,
    });

    for (let i = 0; i < this.state.ordersDocId.length; i++) {
      db.collection("all_orders")
        .doc(this.state.ordersDocId[i])
        .update({
          buyer_id: this.state.emailId,
          buyer_name: this.state.firstName + " " + this.state.lastName,
          address: this.state.address,
        });
    }

    for (let i = 0; i < this.state.requestsDocId.length; i++) {
      db.collection("all_requests")
        .doc(this.state.requestsDocId[i])
        .update({
          buyer_id: this.state.emailId,
          buyer_name: this.state.firstName + " " + this.state.lastName,
        });
    }
    alert("Profile Updated Succesfully");
  };

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="Profile" navigation={this.props.navigation} />
        <View style={styles.formContainer}>
          <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text,
              });
            }}
            value={this.state.firstName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            onChangeText={(text) => {
              this.setState({
                lastName: text,
              });
            }}
            value={this.state.lastName}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={"numeric"}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            value={this.state.address}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder={"abc@example.com"}
            keyboardType={"email-address"}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
            value={this.state.emailId}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff9800" }]}
            onPress={() => {
              this.updateUserDetails();
            }}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ff9800" }]}
            onPress={() => {
              firebase.auth().sendPasswordResetEmail(this.state.emailId);
              alert(
                "Check your Mail Inbox. A Mail is waiting for you from noreply@proud-coral-280616.firebaseapp.com"
              );
            }}
          >
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: "75%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#ff5722",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
});
