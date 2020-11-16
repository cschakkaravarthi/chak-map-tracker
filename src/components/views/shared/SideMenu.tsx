import * as React from 'react';
import { View, Image, TouchableOpacity ,Text} from 'react-native';
import { heightPercentageToDP } from '../../utility/ui-controls/styles'
import _dataManager from '../../utility/common/dataManager';
import { connect } from 'react-redux';

const endMenu = [   
    { id: 2, Text: "About", Icon: require('../../utility/images/settings.png') },
    { id: 3, Text: "Logout", Icon: require('../../utility/images/logout.png') }
]

const mapStateToProps = (state: any) => ({
    ...state.common
})

class SideMenu extends React.Component<{LoginDetails: any}> {

    onClickMenu = (value: any) => {
        const menuName = value._dispatchInstances.child.key;
        switch (menuName) {
            case "Logout":
            _dataManager.navigateTo('login');
                break;
            case "About":
            _dataManager.navigateTo('about');
                break;
            default:
                null
        }
    }
    render() {
        const LoginDetails = this.props.LoginDetails ? this.props.LoginDetails : []
        return (
            <View style={{ flex: 1, flexDirection: "column", backgroundColor: "#FFFFFF" }}>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "#026DB5" }}>
                    <View style={{ justifyContent: "center", alignItems: "center", borderRadius: 50, backgroundColor: "#fff" }}>
                        <Image style={{ width: heightPercentageToDP("10%"), height: heightPercentageToDP("10%"), borderRadius: 50 }}
                            source={require('../../utility/images/noImage.png')} />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Helvetica", fontSize: heightPercentageToDP("2.3%"), color: "#FFFFFF", textAlign: "left", lineHeight: 40 }}>
                            {LoginDetails.Name}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontFamily: "Helvetica", fontSize: heightPercentageToDP("1.5%"), color: "#90C3FF", textAlign: "left" }}>
                            {LoginDetails.RoleID}
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 3, flexDirection: "column", margin: 10,backgroundColor:'#f2f2f2' }}>
                    {endMenu.map(data => {
                        return <TouchableOpacity key={data.id} style={{ height: 45, marginTop: 5 }} onPress={(value: any) => this.onClickMenu(value)}>
                            <View key={data.Text} style={{ flexDirection: "row" }}>
                                <View style={{ padding: 10 }}>
                                    <Image style={{ width: heightPercentageToDP("2.4%"), height: heightPercentageToDP("2.4%") }} source={data.Icon} />
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontFamily: "Roboto-Medium", fontSize: heightPercentageToDP("1.7%"), color: "#000000" }}>
                                        {data.Text}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    })}
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, () => ({}))(SideMenu);