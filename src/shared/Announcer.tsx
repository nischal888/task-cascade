interface AnnouncerProps {
	message: string;
}

const Announcer: React.FC<AnnouncerProps> = ({ message }) => {
	return (
		<div
			aria-live="assertive"
			aria-atomic="true"
			className="sr-only" // Tailwind class makes it visually hidden but available to screen readers
		>
			{message}
		</div>
	);
};

export default Announcer;
