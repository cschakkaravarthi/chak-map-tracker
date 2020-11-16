import { StyleSheet, Dimensions, Platform } from 'react-native'

const dimensions = {
    fullHeight: Dimensions.get('window').height,
    fullWidth: Dimensions.get('window').width
}
const cardItemWidth = 285;
const numColumns = Math.floor(dimensions.fullWidth / cardItemWidth);
const colors = {
    appBg: '#EFF3F6',
    bgPrimary: '#52993d',
    bgSecondary: '#4a90e2',
    bgWhite: 'white',
    bgRed: '#f45c5c',
    textPrimary: '#fff',
    textSecondary: '#fff',
    textBlack: '#212C3E',
    textBlue: '#0000ff',
    textgray: '#878787',
    textRed: '#f45c5c',
    textGray_1: '#3f4c5c',
    textBlue_1: '#5898e4',
    bgTransparent: 'transparent',
    bgSelected: '#DEEDFF'
}
const defaultSize = {
    s5: 5,
    s10: 10,
    s20: 20,
    s30: 30,
    s40: 40,
    s50: 50,
    s60: 60,
    s90: 90,
    s120: 120,
    sP25: "25%",
    sP50: "50%",
    sP80: "80%",
    sP100: "100%"
}
const fonts = {
    f13: 13,
    f14: 14,
    f15: 15,
    f16: 16,
    f17: 17,
    f18: 18,
    f20: 20,
    f28: 28,

    bold: 'bold',
    primary: 'Open-Sans'
}
const position = {
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    center: 'center',
    flex_end: 'flex-end',
    row: 'row',
}
const custom = StyleSheet.create({
    buttonPrimary: {
        width: defaultSize.s120,
        color: colors.textPrimary,
        backgroundColor: colors.bgPrimary,
        ...Platform.select({
            windows: {
                borderRadius: 20,
                padding: 0,
                height:defaultSize.s30
            },
        })
    },
    buttonSecondary: {
        width: defaultSize.s120,
        color: colors.textSecondary,
        backgroundColor: colors.bgSecondary,
        ...Platform.select({
            windows: {
                borderRadius: 20,
                padding: 0,
                height:defaultSize.s30
            },
        })
    },
    footer_button1: {
        backgroundColor: colors.bgPrimary,
        height: 35,
        width: defaultSize.s120,
        ...Platform.select({
            windows: {
                borderRadius: 20,
                padding: 0
            },
        })
    },
    footer_button2: {
        backgroundColor: colors.bgPrimary,
        height: 30,
        width: defaultSize.s90,
        ...Platform.select({
            windows: {
                borderRadius: 20,
                padding: 0
            },
        })
    },
    button_text: {
        color: colors.textPrimary, fontSize: 14, fontFamily: fonts.primary
    },
    divider: {
        marginTop: 5,
        marginBottom: 5
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column"
    },
})

export {
    dimensions, fonts, custom, position, colors, defaultSize, numColumns
}