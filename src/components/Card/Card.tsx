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
            bg-white rounded-md p-4 mb-3 shadow-md hover:shadow-lg 
			transition-shadow duration-200 ease-in-out
            ${snapshot.isDragging ? 'ring-2 ring-blue-500 shadow-xl' : ''}
          `}
				>
					<p className="text-sm text-slate-700">{card.content}</p>
				</div>
			)}
		</Draggable>
	);
};

export default Card;
