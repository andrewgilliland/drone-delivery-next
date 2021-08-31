export default function Button({ color = "purple", children, handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      className={`bg-${color}-500 text-gray-100 px-4 py-2 rounded-md mt-5 transition duration-300 hover:bg-${color}-600 focus:bg-${color}-600`}
    >
      {children}
    </button>
  );
}
