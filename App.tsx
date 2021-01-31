/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import RootNavigator from './src/navigator/RootNavigator';
import {Provider} from 'react-redux';
import store from './src/store/index';

declare const global: {HermesInternal: null | {}};
interface Props {}
const App: React.FC<Props> = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
