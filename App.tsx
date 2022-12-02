import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as Home from './src/components/Home';

export default function App() {
	return (
		<View>
			<Home.Component></Home.Component>
		</View>
	);
}
