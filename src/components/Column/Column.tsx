import { Droppable } from '@hello-pangea/dnd';
import Card from '../Card/Card';
import type { CardType, ColumnType } from '../../types';

interface ColumnProps {
	cards: CardType[];
	column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column, cards }) => {
	return (
		<div className="flex flex-col w-80 m-2 flex-shrink-0 bg-slate-100 rounded-lg shadow-md">
			<div className="flex items-center justify-between p-3 rounded-t-lg bg-slate-200 border-b border-slate-300">
				<h3 className="text-md font-semibold text-slate-700">{column.title}</h3>
				<span className="text-sm font-medium bg-slate-300 text-slate-600 rounded-full px-2 py-1">
					{cards.length}
				</span>
			</div>
			<Droppable droppableId={column.id}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`
              p-2 pt-0 rounded-b-lg min-h-[200px]
              transition-colors duration-300 ease-in-out
              ${snapshot.isDraggingOver ? 'bg-sky-100' : ''}
            `}
					>
						{cards.map((card, index) => (
							<Card key={card.id} card={card} index={index} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;
