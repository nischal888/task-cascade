import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import type { BoardStateType } from '../../types';
import { initialData } from '../../config/data';

const Board: React.FC = () => {
	const [board, setBoard] = useState<BoardStateType>(initialData);
	console.log('board', board);

	const onDragEnd = (result: DropResult) => {
		console.log('result', result);
		const { destination, draggableId, source } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const startColumn = board.columns[source.droppableId];
		const endColumn = board.columns[destination.droppableId];
		if (startColumn === endColumn) {
			const newCardIds = Array.from(startColumn.cardIds);

			newCardIds.splice(source.index, 1);
			newCardIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				cardIds: newCardIds,
			};

			const newState: BoardStateType = {
				...board,
				columns: {
					...board.columns,
					[newColumn.id]: newColumn,
				},
			};
			setBoard(newState);
			return;
		}

		const startCardIds = Array.from(startColumn.cardIds);
		startCardIds.splice(source.index, 1);
		const newStartColumn = {
			...startColumn,
			cardIds: startCardIds,
		};

		const finishCardIds = Array.from(endColumn.cardIds);
		finishCardIds.splice(destination.index, 0, draggableId);
		const newFinishColumn = {
			...endColumn,
			cardIds: finishCardIds,
		};

		const newState: BoardStateType = {
			...board,
			columns: {
				...board.columns,
				[newStartColumn.id]: newStartColumn,
				[newFinishColumn.id]: newFinishColumn,
			},
		};
		setBoard(newState);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex items-start p-4 overflow-x-auto h-full">
				{board.columnOrder.map((columnId) => {
					const column = board.columns[columnId];
					const cards = column.cardIds.map((cardId) => board.cards[cardId]);
					return <Column key={column.id} column={column} cards={cards} />;
				})}
			</div>
		</DragDropContext>
	);
};

export default Board;
