import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import type { BoardStateType } from '../../types';
import { initialData } from '../../config/data';

const Board: React.FC = () => {
	const [board, setBoard] = useState<BoardStateType>(initialData);
	const onDragEnd = (result: DropResult) => {
		console.log('Drag ended!', result);
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
