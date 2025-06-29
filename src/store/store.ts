import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './features/board/BoardSlice';
export const store = configureStore({
	reducer: {
		board: boardReducer,
	},
});

store.subscribe(() => {
	// Save the entire board state to localStorage whenever it changes
	localStorage.setItem(
		'taskCascadeState',
		JSON.stringify(store.getState().board)
	);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
