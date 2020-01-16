//import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import pages
import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
    createStackNavigator({
        Main:{
            screen: Main,
            navigationOptions: {
                headerTitleAlign: "center",
                title: "DevRadar"
            },
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                headerTitleAlign: "center",
                title: "Github Profile"
            }
        }
    },{
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: '#7d40e7',

            }
        },
    })
);

export default Routes;