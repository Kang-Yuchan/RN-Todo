import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import ToDo from './ToDo';
import { AppLoading } from 'expo';
import uuidv1 from 'uuid/v1';

const { height, width } = Dimensions.get('window');

export default class App extends React.Component {
	state = {
		newToDo: '',
		loadedToDos: false,
		toDos: {}
	};
	componentDidMount = () => {
		this._loadToDos();
	};
	render() {
		const { newToDo, loadedToDos, toDos } = this.state;
		if (!loadedToDos) {
			return <AppLoading />;
		}
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<Text style={styles.title}>Kawaii To Do App</Text>
				<View style={styles.card}>
					<TextInput
						style={styles.input}
						placeholder={'New To Do'}
						value={newToDo}
						onChangeText={this._controlNewToDo}
						placeholderTextColor={'#999'}
						returnKeyType={'done'}
						autoCorrect={false}
						onSubmitEditing={this._addToDo}
					/>
					<ScrollView contentContainerStyle={styles.toDos}>
						{Object.values(toDos).map((toDo) => (
							<ToDo key={toDo.id} {...toDo} deleteToDo={this._deleteToDo} />
						))}
					</ScrollView>
				</View>
			</View>
		);
	}
	_controlNewToDo = (text) => {
		this.setState({
			newToDo: text
		});
	};
	_loadToDos = () => {
		this.setState({
			loadedToDos: true
		});
	};
	_addToDo = () => {
		const { newToDo } = this.state;
		if (newToDo !== '') {
			this.setState((prevState) => {
				const ID = uuidv1();
				const newToDoObject = {
					[ID]: {
						id: ID,
						isCompleted: false,
						text: newToDo,
						createdAt: Date.now()
					}
				};
				const newState = {
					...prevState,
					newToDO: '',
					toDos: {
						...prevState.toDos,
						...newToDoObject
					}
				};
				return { ...newState };
			});
		}
	};
	_deleteToDo = (id) => {
		this.setState((prevState) => {
			const toDos = prevState.toDos;
			delete toDos[id];
			const newState = {
				...prevState,
				...toDos
			};
			return { ...newState };
		});
	};
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
		...Platform.select({
			ios: {
				shadowColor: 'rgb(50, 50, 50)',
				shadowOpacity: 0.5,
				shadowRadius: 5,
				shadowOffset: {
					height: -1,
					width: 0
				}
			},
			android: {
				elevation: 3
			}
		})
	},
	input: {
		fontSize: 30,
		borderBottomColor: '#bbb',
		padding: 25,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	toDos: {
		alignItems: 'center'
	}
});
