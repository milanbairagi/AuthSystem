const PrimaryButton = ({ text, type, styles, onClick, loading=false, loadingText }) => {
	return (
		<button
			type={type}
			className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 ${loading ? "opacity-70" : ""} ${styles}`}
			onClick={onClick}
      disabled={loading}
		>
			{loading ? `${loadingText ? loadingText : text + "ing"}...` : text}
		</button>
	);
};

const SecondaryButton = ({ text, type, styles, onClick, loading=false, loadingText }) => {
	return (
		<button
			type={type}
			className={`bg-gray-500 text-white px-4 py-2 rounded mt-4 ${loading ? "opacity-70" : ""} ${styles}`}
			onClick={onClick}
      disabled={loading}
		>
			{loading ? `${loadingText ? loadingText : text + "ing"}...` : text}
		</button>
	);
};

export default PrimaryButton;
export { SecondaryButton };
