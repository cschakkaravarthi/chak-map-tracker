import React from 'react';
import {name as appName} from './app.json';
import { AppRegistry, YellowBox } from 'react-native';
import Stack from './src/components/utility/naviagtions/navigators';
import { Provider } from 'react-redux';
import store from './src/components/utility/redux/store';
import { MenuProvider } from 'react-native-popup-menu';


class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MenuProvider >
                    <Stack />
                </MenuProvider>
            </Provider>
        );
    }
}

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent(appName, () => App);

