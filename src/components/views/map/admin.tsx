import * as React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import firestore from "../../../core/database/firestore";
import { ON_LOAD_MAP } from "../../../constants/actionTypes";
import { connect } from "react-redux";

const mapStateToProps = (state: any) => ({
  ...state.common,
  ...state.map
});

const mapDispatchToProps = (dispatch: any) => ({
  onLoadMap(UserDetails: any) {
    dispatch({ type: ON_LOAD_MAP, UserDetails });
  }
});

interface IMapProps {
  onLoadMap: Function,
  LoginDetails: any,
  UserDetails: any,
  UId: string,
  DocId:string
}

const RetailerStoreMarker = (props: any) => {
  if (props.mapMarkerList !== null){
    return props.mapMarkerList.map((data: any) => {
      if (data.LatLong._lat !== "" && data.LatLong._long) {
        return (
          <Marker key={1} coordinate={{ latitude: parseFloat(data.LatLong._lat), longitude: parseFloat(data.LatLong._long) }}>
            <Callout style={{ borderRadius: 5 }}>
              <View style={{ flexDirection: "column", justifyContent: "center", padding: 5 }}>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontFamily: "Roboto-Medium", fontWeight: "bold", fontSize: 16 }} >
                    Name:{" "}
                  </Text>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: 16 }}>
                    {" "}
                    {data.Name}{" "}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontFamily: "Roboto-Medium", fontWeight: "bold", fontSize: 16 }} >
                    Bus No:{" "}
                  </Text>
                  <Text style={{ fontFamily: "Roboto-Medium", fontSize: 16 }}>
                    {" "}
                    {data.BusNo}{" "}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        );
      }
    });
  }
  else
  { return null;}
};

class AdminMap extends React.Component<IMapProps> {
  async componentWillMount() {

    const _this = this;

    //Disable deprecated features
    await firestore.settings({
      timestampsInSnapshots: true
    });

    await firestore.collection("UserMaster").doc(this.props.DocId)
      .onSnapshot(function (doc) {
        let arrUserDetails = new Array;
        arrUserDetails.push(doc.data());
        if (arrUserDetails.length > 0) {
          _this.props.onLoadMap(arrUserDetails);
        }
      });

  };


  render() {
    const { width, height } = Dimensions.get("window");

    const mapMarkerList = this.props.UserDetails ? this.props.UserDetails : null;
    
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const region = {
      latitude: mapMarkerList !== null && mapMarkerList[0].LatLong._lat > "" ? mapMarkerList[0].LatLong._lat : 13.0012,
      longitude: mapMarkerList !== null && mapMarkerList[0].LatLong._long > "" ? mapMarkerList[0].LatLong._long : 80.2565,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
    return (
      <View style={styles.container}>
        <MapView
          loadingEnabled
          loadingIndicatorColor="#ef8e33"
          loadingBackgroundColor="#eeeeee"
          //customMapStyle={mapStyle}
          style={styles.map}
          moveOnMarkerPress
          cacheEnabled
          region={region}>
          <RetailerStoreMarker mapMarkerList={mapMarkerList} />
        </MapView>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminMap);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
