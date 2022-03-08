import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './TodoList.module.css';
import * as actionTypes from '../store/actions.js';
import { useDispatch } from 'react-redux';

const TodoList = () => {
	const notes = useSelector((state) => state);

	const dispatch = useDispatch();

	const [filteredValue, setFilteredValue] = useState();
	const [filterList, setFilteredList] = useState(notes);
	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (filteredValue === 'true') {
			setFilteredList(notes.filter((item) => item.done === !!filteredValue));
		} else if (filteredValue === 'false') {
			setFilteredList(notes.filter((item) => item.done !== !!filteredValue));
		} else {
			setFilteredList(notes);
		}
	}, [filteredValue, notes]);

	useEffect(() => {
		if (searchValue === '') {
			setFilteredList(notes);
		} else {
			setFilteredList(notes.filter((note) => note.title.includes(searchValue)));
		}
	}, [searchValue, notes]);

	const removeHandler = (id) => {
		dispatch({
			type: actionTypes.REMOVE_TODO,
			payload: id,
		});
	};

	const doneHandler = (id) => {
		dispatch({
			type: actionTypes.DONE_TODO,
			payload: id,
		});
	};

	const searchHandler = (e) => {
		setSearchValue(e.target.value);
	};

	const filterHandler = (e) => {
		setFilteredValue(e.target.value);
	};

	return (
		<div className={classes.todos}>
			<label htmlFor="searchInput">Search from tasks:</label>
			<input type="search" id="searchInput" onChange={searchHandler} />

			<h1>Tasks</h1>
			<select onChange={filterHandler}>
				<option value="all">All</option>
				<option value="false">Not yet done</option>
				<option value="true">Done</option>
			</select>

			{filterList?.map((note) => {
				return (
					<div
						onClick={() => doneHandler(note.id)}
						className={`${classes.todo} ${
							note.done ? classes.done : classes.notDone
						}`}
						key={note.id}
					>
						<h2>{note.title}</h2>
						<p>{note.task}</p>
						<span
							onClick={() => removeHandler(note.id)}
							className={`material-icons ${classes.delete}`}
						>
							delete
						</span>
					</div>
				);
			})}
		</div>
	);
};

export default TodoList;
