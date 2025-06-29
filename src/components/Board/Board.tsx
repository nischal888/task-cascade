import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { cardMoved } from '../../store/features/board/BoardSlice';

const Board: React.FC = () => {
	const board = useSelector((state: RootState) => state.board);
	const dispatch = useDispatch();

	const onDragEnd = (result: DropResult) => {
		dispatch(cardMoved(result));
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="flex items-start p-4 overflow-x-auto h-full bg-slate-100">
				{board.columnOrder.map((columnId) => {
					const column = board.columns[columnId];
					if (!column) return null;
					const cards = column.cardIds
						.map((cardId) => board.cards[cardId])
						.filter(Boolean);
					return <Column key={column.id} column={column} cards={cards} />;
				})}
			</div>
		</DragDropContext>
	);
};

export default Board;
