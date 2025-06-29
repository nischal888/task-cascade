import { Toaster } from 'react-hot-toast';
import BoardPage from './pages/BoardPage';

function App() {
	return (
		<>
			<Toaster
				position="bottom-center"
				toastOptions={{
					className: '',
					duration: 3000,
					style: {
						background: '#374151',
						color: '#fff',
					},
				}}
			/>
			<BoardPage />
		</>
	);
}

export default App;
