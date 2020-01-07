import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" />
			<Text style={styles.title}>Kawaii To Do App</Text>
			<View style={styles.card}>
				<TextInput style={styles.input} placeholder={'New To Do'} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f23657',
		alignItems: 'center'
	},
	title: {
		color: 'white',
		fontSize: 40,
		marginTop: 100,
		fontWeight: '100',
		marginBottom: 40
	},
	card: {
		backgroundColor: 'white',
		flex: 1,
		width: width - 25,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		padding: 15,
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50, 50, 50)',
				shadowOpacity: 0.5,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 1
				}
			},
			android: {
				elevation: 3
			}
		})
	},
	input: {
		fontSize: 30
	}
});
