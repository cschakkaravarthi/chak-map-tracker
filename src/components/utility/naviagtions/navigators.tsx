import * as React from 'react';
import { Login, Home, About, AdminMap, UserMap, UserCreation } from '../../views';
import SideMenu from '../../views/shared/SideMenu';
import { Router, Stack, Scene, Drawer, Actions } from 'react-native-router-flux';
import _dataManager from '../common/dataManager';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../ui-controls/styles/style';
import { colors } from '../ui-controls/styles/custom';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange, removeOrientationListener } from '../../utility/ui-controls/styles';


const BackNavigationButton = (root: string) => {
  return <TouchableOpacity onPress={() => _dataManager.navigateTo(root)}><MaterialIcon name={"arrow-back"}
    style={{ margin: 16 }}
    color={"#fff"}
    size={24} />
  </TouchableOpacity>
}


class Routes extends React.PureComponent {
  render() {
    return (
      <Router sceneStyle={{ backgroundColor: colors.appBg }}>
        <Stack key="root" hideNavBar={false} navigationBarStyle={{ backgroundColor: '#4A90E2', backfaceVisibility: "hidden" }} tintColor="#fff" >
          <Scene key="login" initial={true} component={Login} title="Login" hideNavBar={true} />
          <Drawer key="adminDrawer" hideNavBar contentComponent={SideMenu} drawerWidth={250}  >
            <Scene key="home" titleStyle={styles.h1font} renderLeftButton={() => <MaterialIcon name={"menu"} style={{ margin: 16 }} color={"#fff"} size={30} onPress={() => Actions.drawerOpen()} />} component={Home} title="Home" />
          </Drawer>
          <Scene key="about" title="About" component={About} />
          <Scene key="adminMap" title="Admin Map" component={AdminMap} renderBackButton={() => <View>{BackNavigationButton('home')}</View>} />
          <Drawer key="userDrawer" hideNavBar contentComponent={SideMenu} drawerWidth={250}  >
            <Scene key="userMap" title="User Map" component={UserMap} titleStyle={styles.h1font} renderLeftButton={() => <MaterialIcon name={"menu"} style={{ margin: 16 }} color={"#fff"} size={30} onPress={() => Actions.drawerOpen()} />}/>
          </Drawer>
          <Scene key="userCreation" title="Create New Account" component={UserCreation} renderBackButton={() => <View>{BackNavigationButton('login')}</View>}  />
        </Stack>
      </Router>
    );
  }
}

export default connect(() => ({}), ({}))(Routes);
