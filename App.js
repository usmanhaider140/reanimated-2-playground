import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import Screen from './screens/Screen5';

AppRegistry.registerComponent(appName, () => Screen);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, {rootTag});
}

export default Screen;
