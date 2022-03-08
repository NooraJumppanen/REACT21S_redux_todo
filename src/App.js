import React, { useEffect } from 'react';
import AddTodo from './components/Todo/AddTodo';
import TodoList from './components/Todo/TodoList';
import { useDispatch } from 'react-redux';
import { initNotes } from './components/store/reducer';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initNotes());
	}, [dispatch]);

	return (
		<div>
			<AddTodo />
			<TodoList />
		</div>
	);
};

export default App;
