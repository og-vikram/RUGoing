import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';


//screens
import AccountCreationPage from '../web/accountCreation';
import LoginPage from '../web/loginPage';
import OrganizationInfoPage from '../web/organizationPage';

const Stack = createStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteNAme="Login"
            >
                <Stack.Screen name="Login" component={LoginPage}/>
                <Stack.Screen name="AccountCreationPage" component={AccountCreationPage}/>  
                <Stack.Screen name="OrganizationInfoPage" component={OrganizationInfoPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;