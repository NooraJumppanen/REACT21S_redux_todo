import axios from 'axios';

const baseURL = 'http://localhost:3002/notes';

const getAll = async () => {
	const res = await axios.get(baseURL);
	return res.data;
};

const createNew = async (content) => {
	const note = { ...content, done: false };
	const res = await axios.post(baseURL, note);
	return res.data;
};

export default { getAll, createNew };
