import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from '.';
import { custom, defaultSize, fonts, position, colors, dimensions, numColumns } from './custom';

const styles = StyleSheet.create({

    //Common Style
    h1font: {
        fontFamily: fonts.primary,
        fontSize: fonts.f20,
        letterSpacing: 0.2
    },
    h2font: {
        fontFamily: fonts.primary,
        fontSize: fonts.f18,
        fontWeight: "bold",
        letterSpacing: 0.2
    },
    t1font: {
        fontFamily: fonts.primary,
        fontSize: fonts.f16,
        color: colors.textGray_1,
        letterSpacing: 0.2
    },
    t2font: {
        fontFamily: fonts.primary,
        fontSize: fonts.f15,
        color: colors.textgray,
        letterSpacing: 0.2
    },
    b1font: {
        fontFamily: fonts.primary,
        fontSize: fonts.f17,
        letterSpacing: 0.2
    },
    captionFont: {
        fontFamily: fonts.primary,
        fontSize: fonts.f14,
        color: colors.textgray,
        letterSpacing: 0.2
    },
    footerFont: {
        fontFamily: fonts.primary,
        fontSize: fonts.f13,
        color: colors.textgray,
        letterSpacing: 0.2
    },
    buttonFont: {
        color: "#fff",
        fontSize: fonts.f16,
        fontFamily: fonts.primary,
        letterSpacing: 0.2
    },
    cardContainer: {
        padding: 5,
        margin: 7,
        borderRadius: 5
    },
    cardWarpper: {
        width: "100%"
    },
    mediumTextStyle: {
        color: '#6A6A6A',
        textAlign: 'left',
        fontSize: heightPercentageToDP("1.6%"),
        fontFamily: "Roboto-Medium"
    },
    titleTextStyle: {
        fontFamily: "Roboto-Regular",
        fontSize: heightPercentageToDP("2.2%"),
        color: "#6A6A6A",
        fontWeight: "600"
    },

    //Login page
    loginMainContainer: {
        flex: 1,
        backgroundColor: '#212C3E'
    },
    loginContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginCardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 370,padding:10
    },
    loginInputMainContainer: {
        margin: 8,
        width: 280,
        height: 42,
        borderRadius: 20,
        backgroundColor: '#FFFFFF'
    },
    loginInputStyle: {
        ...Platform.select({
            windows: {
                borderColor: '#FFFFFF',
                borderWidth: 0,
                marginTop: 9,
                marginLeft: 8
            }
        })
    },
    loginButton: {
        margin: 8,
        width: 280,
        height: 42,
        backgroundColor: '#52993D',
        ...Platform.select({
            windows: { borderRadius: 20, padding: 0 },
        })
    },
    clearButton: {
        margin: 16,
        width: 150,
        height: 43,
        backgroundColor: '#6A6A6A',
        ...Platform.select({
            windows: { borderRadius: 20 },
        })
    },
    loginImage: {
        resizeMode: "contain",
        minWidth: widthPercentageToDP("70%"),
        maxWidth: widthPercentageToDP("100%"),
        minHeight: heightPercentageToDP("15%"),
        maxHeight: heightPercentageToDP("15%"),
        alignSelf: "center"
    },

    // Syncronization Page

    overLay: {
        flexDirection: "row",
        padding: defaultSize.s10
    },
    buttonSync: {
        width: defaultSize.s120,
        color: colors.textPrimary,
        backgroundColor: colors.bgPrimary
    },
    buttonDownload: {
        width: defaultSize.s120,
        color: colors.textSecondary,
        backgroundColor: colors.bgSecondary
    },
    syncBottomSection: {
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: defaultSize.s10
    },

    //Home Page 

    mainContainer: {
        flex: 1,
        padding: 5,
        flexDirection: "column",
        backgroundColor:'lightgray'
    },
    menuListContainer: {
        justifyContent: "center",width:'100%'
    },
    menuCardContainer: {
        height: 110,
        width: numColumns > 1 ? 285 : 320,
        margin: 5,
        elevation: 0,
        paddingLeft: 8,
        marginBottom: 7,
        borderRadius: 10
    },
    menuCardWrapper: {
        padding: 10,
        flexDirection: "row",width:'100%'
    },

});

export default styles;