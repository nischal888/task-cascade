// src/store/features/board/boardSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BoardStateType } from '../../../types';
import { initialData } from '../../../config/data';

const initialState: BoardStateType = (() => {
	try {
		const savedState = localStorage.getItem('taskCascadeState');
		return savedState ? JSON.parse(savedState) : initialData;
	} catch {
		return initialData;
	}
})();

export const boardSlice = createSlice({
	name: 'board',
	initialState,
	reducers: {},
});

export default boardSlice.reducer;
