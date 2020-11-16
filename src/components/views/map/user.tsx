import * as React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import firestore from "../../../core/database/firestore";
import { ON_LOAD_USERMAP, ON_LOAD_WATCHID } from "../../../constants/actionTypes";
import { connect } from "react-redux";
import { debug } from "util";

const mapStateToProps = (state: any) => ({
    ...state.common,
    ...state.map
});

const mapDispatchToProps = (dispatch: any) => ({
    onLoadUserMap(LatLongDetails: any) {
        dispatch({ type: ON_LOAD_USERMAP, LatLongDetails });
    },
    onLoadWatchId(watchID: any) {
        dispatch({ type: ON_LOAD_WATCHID, watchID })
    }
});

interface IMapProps {
    onLoadUserMap: Function,
    LoginDetails: any,
    LatLongDetails: any,
    UId: string,
    onLoadWatchId: Function,
    watchID: number
}

const RetailerStoreMarker = (props: any) => {
    if (props.mapMarkerList !== null) {
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
                            </View>
                        </Callout>
                    </Marker>
                );
            }
        });
    }
    else { return null; }
};

class UserMap extends React.Component<IMapProps> {

    updateLatLong = async (lat, long) => {
        //Disable deprecated features
        await firestore.settings({
            timestampsInSnapshots: true
        });
        await firestore.collection("UserMaster").doc(this.props.UId).update({
            LatLong: {
                _lat: lat,
                _long: long,
            }
        }).then(() => {
            let LatLongDetails = new Array;
            LatLongDetails.push({
                LatLong: {
                    _lat: lat,
                    _long: long,
                }, Name: 'You'
            });
            if (LatLongDetails.length > 0) {
                this.props.onLoadUserMap(LatLongDetails);
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.updateLatLong(position.coords.latitude, position.coords.longitude)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        let watchID = navigator.geolocation.watchPosition((position) => {
            this.updateLatLong(position.coords.latitude, position.coords.longitude)
        });
        this.props.onLoadWatchId(watchID);
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.props.watchID);
    }


    render() {
        const { width, height } = Dimensions.get("window");

        const mapMarkerList = this.props.LatLongDetails ? this.props.LatLongDetails : null;

        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 0.0922;
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        const region = {
            latitude: mapMarkerList !== null && mapMarkerList[0].LatLong._lat > "" ? mapMarkerList[0].LatLong._lat : 10.6130985,
            longitude: mapMarkerList !== null && mapMarkerList[0].LatLong._long > "" ? mapMarkerList[0].LatLong._long : 79.5585103,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserMap);

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
