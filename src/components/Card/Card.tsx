import { Draggable } from '@hello-pangea/dnd';
import { useState, useRef, useEffect } from 'react';
import type { CardType } from '../../types';
import { useDispatch } from 'react-redux';
import {
	cardDeleted,
	cardUpdated,
} from '../../store/features/board/boardSlice';

interface CardTypeProps {
	card: CardType;
	index: number;
	columnId: string;
}
const Card: React.FC<CardTypeProps> = ({ card, index, columnId }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(card.content);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isEditing && textareaRef.current) {
			textareaRef.current.focus();

			textareaRef.current.select();
		}
	}, [isEditing]);

	const handleDelete = () => {
		dispatch(cardDeleted({ cardId: card.id, columnId }));
	};

	const handleEditSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!editText.trim()) {
			setIsEditing(false);
			setEditText(card.content);
			return;
		}
		dispatch(cardUpdated({ cardId: card.id, newContent: editText }));
		setIsEditing(false);
	};

	const cardContent = isEditing ? (
		<form onSubmit={handleEditSubmit}>
			<textarea
				autoFocus
				value={editText}
				onChange={(e) => setEditText(e.target.value)}
				onBlur={handleEditSubmit}
				className="w-full p-2 rounded-md border border-slate-300 shadow-sm resize-none"
			/>
		</form>
	) : (
		<div className="flex justify-between items-start">
			<p className="text-sm font-normal break-words">{card.content}</p>
			<div className="flex flex-shrink-0 ml-2">
				{/* EDIT button fixed */}
				<button
					onClick={() => setIsEditing(true)}
					className="
            flex-shrink-0 w-6 h-6
            flex items-center justify-center
            rounded text-slate-500 hover:bg-slate-200 hover:text-slate-800
            opacity-0 group-hover:opacity-100 transition-opacity
          "
					aria-label="Edit card"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
						/>
					</svg>
				</button>

				<button
					onClick={handleDelete}
					className="
            flex-shrink-0 w-6 h-6 ml-2
            flex items-center justify-center
            rounded text-slate-500 hover:bg-slate-200 hover:text-slate-800
            opacity-0 group-hover:opacity-100 transition-opacity
          "
					aria-label="Delete card"
				>
					✕
				</button>
			</div>
		</div>
	);

	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`
            group p-3 my-2 rounded-md
            bg-white text-slate-800
            hover:bg-slate-50 transition-colors duration-200
            cursor-grab shadow border border-slate-200/80
            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-sky-700' : ''}
          `}
				>
					{cardContent}
				</div>
			)}
		</Draggable>
	);
};

export default Card;
