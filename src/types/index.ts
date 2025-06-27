export type CardId = string;
export type ColumnId = string;

export interface CardType {
	id: CardId;
	content: string;
}

export interface ColumnType {
	id: ColumnId;
	title: string;
	cardIds: ColumnId[];
}

export interface BoardStateType {
	cards: Record<CardId, CardType>;
	columns: Record<ColumnId, ColumnType>;
	columnOrder: ColumnId[];
}
