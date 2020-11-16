import * as React from 'react';
import { View, TouchableOpacity, FlatList, Dimensions, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { HOME_PAGE_LOADED } from '../../../constants/actionTypes';
import _dataManager from '../../utility/common/dataManager';
import styles from '../../utility/ui-controls/styles/style';
import firestore from "../../../core/database/firestore";
import { Card, Button } from "native-base";
import { custom, defaultSize } from '../../utility/ui-controls/styles/custom';

const mapStateToProps = (state: any) => ({
    ...state.common
});

const mapDispatchToProps = (dispatch: any) => ({
    onLoad: (arrUserDetails: any) => {
        dispatch({ type: HOME_PAGE_LOADED, arrUserDetails });
    }
});

interface IHomeProps {
    onLoad: any,
    arrUserDetails: any,
};

class Home extends React.Component<IHomeProps>{

    async componentWillMount() {
        const _this = this;

        //Disable deprecated features
        await firestore.settings({
            timestampsInSnapshots: true
        });
        let arrUserDetails = new Array;
        await firestore.collection("UserMaster").where("RoleID", "==", "User")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let _data = doc.data();
                    _data.DocId = doc.id;
                    arrUserDetails.push(_data);
                });
                _this.props.onLoad(arrUserDetails);
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }

    _renderItem = (item: any) => {
        return (
            <TouchableOpacity onPress={() => _dataManager.navigateTo('adminMap', { DocId: item.DocId })}>
                <Card style={{ width: defaultSize.sP80, margin: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: "space-between", margin: 10 }}>
                        <View >
                            <Text style={[styles.h2font, { color: "#3F4C5C", fontWeight: "400" }]}>{item.Name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                            <Text style={[styles.captionFont, { top: 3 }]}> Role :&nbsp;</Text>
                            <Text style={[styles.t1font, { top: 3 }]}>{item.RoleID}</Text>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={custom.mainContainer}>
                <View style={{ width: '100%',flexDirection: 'row',justifyContent: "space-between"}}>
                    <View style={{ margin: 15, marginBottom: 5 }}>
                        <Text style={[styles.h2font]}>{'User List'}</Text>
                    </View>
                </View>
                <View >
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, idx) => idx.toString()}
                            data={this.props.arrUserDetails}
                            numColumns={1}
                            renderItem={({ item }) => this._renderItem(item)}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);