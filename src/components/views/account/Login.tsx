import * as React from "react";
import {
  View,
  Image,
  Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground
} from "react-native";
import { Card, Button } from "native-base";
import { UPDATE_FIELD, LOGIN_DETAIL } from "../../../constants/actionTypes";
import { connect } from "react-redux";
import firestore from "../../../core/database/firestore";
import { DataManager } from '../../utility/common';
import Localized from '../../utility/localization/Localized';

const mapStateToProps = (state: any) => ({
  ...state.common,
  ...state.form
});

const mapDispatchToProps = (dispatch: any) => ({
  updateFieldValue: (keyName: string, value: string) => {
    dispatch({ type: UPDATE_FIELD, key: keyName, value });
  },
  onSetUser(loginDetails: any, UId: string) {
    dispatch({ type: LOGIN_DETAIL, loginDetails, UId });
  }
});

interface ILoginProps {
  updateFieldValue: Function,
  onSetUser: Function,
  UId: number,
  Username: string,
  Password: string,
  LoginDetails:any
}

class Login extends React.Component<ILoginProps> {

  onLogin = async () => {
    if (this.props.Username && this.props.Password) {
      const getData = await this.getLoginDetails();
      if (getData.length > 0) {
        this.props.onSetUser(getData[0].data, getData[0].id);
        if (this.props.LoginDetails.RoleID === "Admin")
          DataManager.navigateTo('home');
        else
          DataManager.navigateTo('userMap');
        DataManager.toast(Localized.login_success);
      } else {
        alert("Invalid Username and Password!");
      }
    }
  };

  getLoginDetails = async () => {

    let arrLoginDetails = new Array();

    await firestore.settings({ timestampsInSnapshots: true });
    await firestore.collection("UserMaster").where("Username", "==", this.props.Username).where("Password", "==", this.props.Password)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          arrLoginDetails.push({ id: doc.id, data: doc.data() });
        });
      })
      .catch(function (error) {
        DataManager.toast("Error getting documents: " + error);
      });

    return Promise.resolve(arrLoginDetails);
  };



  render() {
    return (
      <ImageBackground style={styles.container} source={require('../../utility/images/bg.png')}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../utility/images/AppIcon.png')} />
        </View>

        <View style={styles.loginForm}>
          <Card style={{ padding: 10 }}>

            <TextInput style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.props.Username}
              onChangeText={value => this.props.updateFieldValue("Username", value)}
              keyboardType='email-address'
              returnKeyType="next"
              placeholder='Username'
              placeholderTextColor='#999999' />

            <TextInput style={styles.input}
              returnKeyType="go"
              value={this.props.Password}
              onChangeText={value => this.props.updateFieldValue("Password", value)}
              placeholder='Password'
              placeholderTextColor='#999999'
              secureTextEntry />

            <TouchableOpacity style={styles.buttonContainer}
              onPress={this.onLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

          </Card>
        </View>
        <TouchableOpacity style={styles.createAccountContainer}
          onPress={() => DataManager.navigateTo('userCreation')}>
          <Text style={styles.createAccountText}>NEW ACCOUNT</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100
  },
  loginForm: {
    flex: 2,
    justifyContent: 'flex-end',
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#404040'
  },
  buttonContainer: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  createAccountContainer: {
    marginBottom: 20, marginLeft: 25
  },
  createAccountText: {
    color: '#f2f2f2',
    fontWeight: '500'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
