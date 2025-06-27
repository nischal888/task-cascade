import type { BoardStateType } from '../types';

export const initialData: BoardStateType = {
	cards: {
		'card-1': { id: 'card-1', content: 'Design the database schema' },
		'card-2': { id: 'card-2', content: 'Develop user authentication API' },
		'card-3': { id: 'card-3', content: 'Set up CI/CD pipeline' },
		'card-4': { id: 'card-4', content: 'Create wireframes for the dashboard' },
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To Do',
			cardIds: ['card-1', 'card-2', 'card-3', 'card-4'],
		},
		'column-2': {
			id: 'column-2',
			title: 'In Progress',
			cardIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			cardIds: [],
		},
	},
	// Facilitate reordering of the columns
	columnOrder: ['column-1', 'column-2', 'column-3'],
};
