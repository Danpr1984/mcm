const LoadingSpinner = () => {
  return (
    <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-indigo-600">
      <img
        className="object-cover"
        alt="User avatar"
        src="/images/colourwheel.png"
      />
    </div>
  );
};

export default LoadingSpinner;
