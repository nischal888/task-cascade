import { Draggable } from '@hello-pangea/dnd';
import type { CardType } from '../../types';

interface CardTypeProps {
	card: CardType;
	index: number;
}
const Card: React.FC<CardTypeProps> = ({ card, index }) => {
	return (
		<Draggable draggableId={card.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`
            p-3 my-2 rounded-md
            bg-white text-slate-800
            hover:bg-slate-50 transition-colors duration-200
            cursor-grab shadow
            border border-slate-200/80
            ${snapshot.isDragging ? 'shadow-lg ring-2 ring-sky-500' : ''}
          `}
				>
					<p className="text-sm font-normal">{card.content}</p>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
