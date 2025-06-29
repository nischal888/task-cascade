// src/store/features/board/boardSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BoardStateType } from '../../../types';
import { initialData } from '../../../config/data';
import type { DropResult } from '@hello-pangea/dnd';

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
	// Update the reducer object
	reducers: {
		cardMoved: (state, action: PayloadAction<DropResult>) => {
			const { destination, source, draggableId } = action.payload;

			// we can "mutate" the state directly!
			if (!destination) return;
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			)
				return;

			const startColumn = state.columns[source.droppableId];
			const finishColumn = state.columns[destination.droppableId];

			if (startColumn === finishColumn) {
				const newCardIds = Array.from(startColumn.cardIds);
				newCardIds.splice(source.index, 1);
				newCardIds.splice(destination.index, 0, draggableId);

				// Immer lets us do this!
				state.columns[startColumn.id].cardIds = newCardIds;
				return;
			}

			const startCardIds = Array.from(startColumn.cardIds);
			startCardIds.splice(source.index, 1);

			const finishCardIds = Array.from(finishColumn.cardIds);
			finishCardIds.splice(destination.index, 0, draggableId);

			state.columns[startColumn.id].cardIds = startCardIds;
			state.columns[finishColumn.id].cardIds = finishCardIds;
		},
		cardCreated: (
			state,
			action: PayloadAction<{ columnId: string; cardContent: string }>
		) => {
			const { columnId, cardContent } = action.payload;

			// The logic is identical to our old handleCreateCard function
			const newCardId = `card-${Date.now()}`;
			const newCard = {
				id: newCardId,
				content: cardContent,
			};

			// We can "mutate" state directly thanks to Immer
			state.cards[newCardId] = newCard;
			state.columns[columnId].cardIds.push(newCardId);
		},
	},
});

//  Export the action creator
export const { cardMoved, cardCreated } = boardSlice.actions;

export default boardSlice.reducer;
