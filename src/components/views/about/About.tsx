import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import DeviceInfo from "react-native-device-info";

class About extends React.Component {
  render() {
    const version = DeviceInfo.getVersion();
    return (
      <View style={style.aboutAppMainContainer}>
        <View style={{ flex: 1,margin: 10,padding:10,backgroundColor:'#FFF'}}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <View style={{ alignItems: "center", margin: 10 }}>
              <Image
                style={{ height: 80, width: 300, resizeMode: "contain" }}
                source={require("../../utility/images/Sri-Eshwar.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 16, fontFamily: "Roboto-Medium" }}>
                Warning: This software application is protected by copyright law
                and International treaties. Unauthorized reproduction or
                distribution of this program, or any portion of it, may result
                in severe civil and criminal penalities, and will be prosecuted
                to the maximum extent possible under the law.
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 2.5,
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={{ fontFamily: "Roboto-Medium" }}>
                Version {version}
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Roboto-Medium" }}>
                © 2019. All rights reserved.
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

var style = StyleSheet.create({
  aboutAppMainContainer: {
    flex: 1,
    flexDirection: "column"
  }
});

export default About;
