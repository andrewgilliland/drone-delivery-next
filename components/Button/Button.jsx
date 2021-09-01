export default function Button({ secondary, children, handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      className={`text-gray-100 px-4 py-2 rounded-md mt-5 transition duration-300 ${
        secondary
          ? "bg-pink-500 hover:bg-pink-600 focus:bg-pink-600"
          : "bg-purple-500 hover:bg-purple-600 focus:bg-purple-600"
      }`}
    >
      {children}
    </button>
  );
}
