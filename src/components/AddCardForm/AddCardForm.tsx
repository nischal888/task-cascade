import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { cardCreated } from '../../store/features/board/boardSlice';

interface AddCardFormProps {
	columnId: string;
}

const AddCardForm: React.FC<AddCardFormProps> = ({ columnId }) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [cardTitle, setCardTitle] = useState<string>('');

	const dispatch = useDispatch();

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedTitle = cardTitle.trim();
		if (!trimmedTitle) {
			toast.error(
				'A blank page holds endless possibilities, but a card needs a task!'
			);
			return;
		}

		dispatch(cardCreated({ columnId, cardContent: cardTitle }));
		setCardTitle('');
		setIsFormOpen(false);
	};

	if (isFormOpen) {
		return (
			<form onSubmit={handleFormSubmit} className="p-2">
				<textarea
					autoFocus
					placeholder="What’s on your mind?"
					value={cardTitle}
					onChange={(e) => setCardTitle(e.target.value)}
					//onBlur={() => setIsFormOpen(false)} // Optional: close form if user clicks away
					className="w-full p-2 rounded-md border border-slate-300 shadow-sm resize-none"
				/>
				<div className="flex items-center space-x-2 mt-2">
					<button
						type="submit"
						className="px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
					>
						Let’s go!
					</button>
					<button
						type="button"
						onClick={() => setIsFormOpen(false)}
						className="p-2 text-slate-500 hover:text-slate-700"
					>
						✕
					</button>
				</div>
			</form>
		);
	}

	return (
		<>
			<button
				onClick={() => setIsFormOpen(true)}
				className="flex items-center justify-start w-full p-2 rounded-md text-slate-500 hover:bg-slate-200/70"
			>
				<span className="text-xl mr-2">+</span>
				Add a new task
			</button>
		</>
	);
};

export default AddCardForm;
