import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import TodoNavigator from './TodoNavigator';
import AuthNavigator from './AuthNavigator';

interface rootNavigatorProps {

}

const RootNavigator: React.FC<rootNavigatorProps> = ({}) => {
    const [auth, setAuth] = useState(false)
    return (
      <NavigationContainer>
        {auth && <TodoNavigator/>}
        {!auth && <AuthNavigator login={setAuth}/>}
      </NavigationContainer>
    );
}


export default RootNavigator;