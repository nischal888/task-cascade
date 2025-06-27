import { Droppable } from '@hello-pangea/dnd';
import Card from '../Card/Card';
import type { CardType, ColumnType } from '../../types';

interface ColumnProps {
	cards: CardType[];
	column: ColumnType;
}

const Column: React.FC<ColumnProps> = ({ column, cards }) => {
	return (
		<div className="flex flex-col w-80 m-2">
			<div className="bg-slate-200 p-3 rounded-t-lg shadow-md">
				<h3 className="text-md font-semibold text-slate-700">{column.title}</h3>
			</div>
			<Droppable droppableId={column.id}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className={`
								p-3 bg-slate-100 rounded-b-lg flex-grow transition-colors 
								duration-200 ease-in-out
								${snapshot.isDraggingOver ? 'bg-sky-100' : ''}
								`}
						style={{ minHeight: '100px' }}
					>
						{cards.map((card, index) => {
							return <Card key={card.id} card={card} index={index} />;
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Column;
