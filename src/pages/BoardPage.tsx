import Board from '../components/Board/Board';

const BoardPage = () => {
	return (
		<div className="flex flex-col h-screen">
			<header className="p-4 bg-white border-b border-slate-200 shadow-sm">
				<h1 className="text-2xl font-bold text-slate-800">
					Task-Cascade Board
				</h1>
			</header>
			<main className="flex-grow overflow-hidden">
				<Board />
			</main>
		</div>
	);
};

export default BoardPage;
