import React, { useState } from 'react';
import {
	DragDropContext,
	type DropResult,
	type DragStart,
	type ResponderProvided,
} from '@hello-pangea/dnd';

import Column from '../Column/Column';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { cardMoved } from '../../store/features/board/boardSlice';
import Announcer from '../../shared/Announcer';

const Board: React.FC = () => {
	const board = useSelector((state: RootState) => state.board);
	const dispatch = useDispatch();
	const [announcement, setAnnouncement] = useState('');

	const onDragStart = (start: DragStart, provided: ResponderProvided) => {
		// The library provides a default announcement message
		const message = `You have lifted the task in position ${
			start.source.index + 1
		}`;
		setAnnouncement(message);
		provided.announce(message);
	};

	const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
		const message = `You have Moved the task in position ${result.destination?.index}`;
		setAnnouncement(message);
		provided.announce(message);
		dispatch(cardMoved(result));
	};

	return (
		<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<div className="flex items-start p-4 overflow-x-auto h-full bg-slate-50">
				{board.columnOrder.map((columnId) => {
					const column = board.columns[columnId];
					if (!column) return null;
					const cards = column.cardIds
						.map((cardId) => board.cards[cardId])
						.filter(Boolean);
					return <Column key={column.id} column={column} cards={cards} />;
				})}
			</div>
			<Announcer message={announcement} />
		</DragDropContext>
	);
};

export default Board;
