import type { BoardStateType } from '../types';

export const initialData: BoardStateType = {
	cards: {
		'card-1': { id: 'card-1', content: 'Welcome! Your first idea here.' },
		'card-2': {
			id: 'card-2',
			content: 'Drag me to *In Motion* when you start.',
		},
		'card-3': {
			id: 'card-3',
			content: 'You’re building something awesome, keep at it!',
		},
		'card-4': {
			id: 'card-4',
			content: 'Drop a card here and celebrate your win!',
		},
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Ideas',
			cardIds: ['card-1', 'card-2'],
		},
		'column-2': {
			id: 'column-2',
			title: 'In Motion',
			cardIds: ['card-3'],
		},
		'column-3': {
			id: 'column-3',
			title: 'Mission Complete',
			cardIds: ['card-4'],
		},
	},
	// Facilitate reordering of the columns
	columnOrder: ['column-1', 'column-2', 'column-3'],
};
