import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends React.Component {
	state = {
		isEditing: false,
		isCompleted: false
	};
	render() {
		const { isCompleted } = this.state;
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this._toggleComplete}>
					<View style={[ styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle ]} />
				</TouchableOpacity>
				<Text style={styles.text}>Hello Im ToDo</Text>
			</View>
		);
	}
	_toggleComplete = () => {
		this.setState(({ isCompleted }) => {
			return {
				isCompleted: !isCompleted
			};
		});
	};
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center'
	},
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 20,
		borderWidth: 3
	},
	completedCircle: {
		borderColor: '#bbb'
	},
	uncompletedCircle: {
		borderColor: 'red'
	},
	text: {
		fontWeight: '600',
		fontSize: 20,
		marginVertical: 20
	}
});
