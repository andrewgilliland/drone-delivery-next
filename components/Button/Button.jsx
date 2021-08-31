export default function Button({ children, handleSubmit }) {
    return (
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-gray-100 px-4 py-2 rounded-md mt-5 transition duration-300 hover:bg-blue-600 focus:bg-blue-600"
      >
        {children}
      </button>
    );
  }