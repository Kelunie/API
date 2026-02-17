/* call react libraries */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Navigator from './views/navigator'; // <-- tu BottomTabs
import InfoNote from './views/InfoNote';
import InfoComment from './views/InfoComment';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          
          {/* Aquí metemos el Tab Navigator */}
          <Stack.Screen
            name="Home"
            component={Navigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="InfoNote"
            component={InfoNote}
            options={{ title: 'Note data' }}
          />

          <Stack.Screen
            name="InfoComment"
            component={InfoComment}
            options={{ title: 'Add comment' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
