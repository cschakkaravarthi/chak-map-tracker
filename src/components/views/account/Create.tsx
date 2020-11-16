
import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Picker, FlatList, Text, Platform, TextInput } from 'react-native';
import styles from '../../utility/ui-controls/styles/style';
import {
    UPDATE_FIELD
} from '../../../constants/actionTypes';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../utility/ui-controls/styles';
import { custom, defaultSize, dimensions, colors } from '../../utility/ui-controls/styles/custom';
import { Card, Button } from "native-base";
import firestore from "../../../core/database/firestore";
import { DataManager } from '../../utility/common';


const mapStateToProps = (state: any) => ({
    ...state.common,
    ...state.form
});

const mapDispatchToProps = (dispatch: any) => ({
    updateFieldValue: (keyName: string, value: string) => {
        dispatch({ type: UPDATE_FIELD, key: keyName, value });
    }
});

interface UserCreationProps {
    updateFieldValue:any,
    Name: string,
    Username: string,
    Password: string,
    BusNo:string,
    onClearFields: Function
}

class UserCreation extends React.Component<UserCreationProps> {

    async componentWillMount() {
    }

    onClearAddress = () => {
        this.props.onClearFields()
    }

    onSubmit = () => {

        //Disable deprecated features
        firestore.settings({
            timestampsInSnapshots: true
        });

        firestore.collection("UserMaster").add({
            LatLong: { _lat: 0, _long: 0 },
            Name: this.props.Name,
            Password: this.props.Username,
            RoleID: 'User',
            Username: this.props.Password,
            BusNo:this.props.BusNo
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            DataManager.toast('Successfully has been created New User Account');
            DataManager.navigateTo('login');
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }



    render() {

        return (
            <View style={custom.mainContainer}>
                <View style={{ flexDirection: 'row', justifyContent: "center",alignItems:'center'  }}>
                    <Card style={{ height: "90%", alignItems: "center", paddingRight: 0 }}>
                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                <View style={{ margin: 5, width: defaultSize.sP100 }}>
                                    <TextInput value={this.props.Name} placeholder="Name" onChangeText={(value) => this.props.updateFieldValue("Name", value)} />
                                </View>
                                <View style={{ margin: 5, width: defaultSize.sP100 }}>
                                    <TextInput value={this.props.Username} placeholder="Username" onChangeText={(value) => this.props.updateFieldValue("Username", value)} />
                                </View>
                                <View style={{ margin: 5, width: defaultSize.sP100 }}>
                                    <TextInput value={this.props.Password} placeholder="Password" onChangeText={(value) => this.props.updateFieldValue("Password", value)} />
                                </View>
                                <View style={{ margin: 5, width: defaultSize.sP100 }}>
                                    <TextInput value={this.props.BusNo} placeholder="Bus Number" onChangeText={(value) => this.props.updateFieldValue("BusNo", value)} />
                                </View>
                            </View>
                        <View style={{ flexDirection: "column", alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginBottom: 20,backgroundColor:'green',padding:10}}
                                onPress={() => this.onSubmit()}>
                                <Text style={{ color: '#f2f2f2', fontWeight: '500' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>

            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreation);



