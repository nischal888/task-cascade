import Board from '../components/Board/Board';

const BoardPage = () => {
	return (
		<div className="flex flex-col h-screen">
			<header className="p-4 flex items-center justify-between bg-sky-700 text-white shadow-md">
				<h1 className="text-xl font-bold tracking-wider">TaskCascade</h1>
				<div className="flex items-center space-x-2">
					{/* Future buttons go here */}
				</div>
			</header>
			<main className="flex-grow overflow-hidden">
				<Board />
			</main>
		</div>
	);
};

export default BoardPage;
