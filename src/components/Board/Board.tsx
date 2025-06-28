import { useEffect, useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import type { BoardStateType } from '../../types';
import { initialData } from '../../config/data';

const Board: React.FC = () => {
	const [board, setBoard] = useState<BoardStateType>(() => {
		try {
			const savedState = localStorage.getItem('taskCascadeState');
			return savedState
				? (JSON.parse(savedState) as BoardStateType)
				: initialData;
		} catch (error) {
			console.log('Failed to parse from Local Storage:', error);
			return initialData;
		}
	});

	useEffect(() => {
		localStorage.setItem('taskCascadeState', JSON.stringify(board));
	}, [board]);

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
		console.log('startColumn', startColumn);
		console.log('endColumn', endColumn);
		if (startColumn === endColumn) {
			const newCardIds = Array.from(startColumn.cardIds);
			newCardIds.splice(source.index, 1);
			newCardIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...startColumn,
				cardIds: newCardIds,
			};

			const newState = {
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
		console.log('startCardIdsFIrst', startCardIds);
		// remove the card ID from source column
		startCardIds.splice(source.index, 1);
		console.log('startCardIds', startCardIds);
		const startNewCol = {
			...startColumn,
			cardIds: startCardIds,
		};
		console.log('startNewCol', startNewCol);
		const endCardIds = Array.from(endColumn.cardIds);
		endCardIds.splice(destination.index, 0, draggableId);

		const endNewCol = {
			...endColumn,
			cardIds: endCardIds,
		};
		console.log('endNewCol', endNewCol);
		const newState: BoardStateType = {
			...board,
			columns: {
				...board.columns,
				[startNewCol.id]: startNewCol,
				[endNewCol.id]: endNewCol,
			},
		};
		setBoard(newState);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex items-start p-4 overflow-x-auto h-full bg-slate-100">
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
