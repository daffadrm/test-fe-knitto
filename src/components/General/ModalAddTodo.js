import React from 'react';

const ModalAddTodo = ({
	isModalOpen,
	closeModal,
	handleSubmit,
	formData,
	handleInputChange,
}) => {
	return (
		<div>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center">
					<div className="bg-black opacity-50 fixed inset-0"></div>
					<div className="bg-white p-8 max-w-md w-full rounded z-10">
						<div className="flex justify-end">
							<span
								className="ml-2 text-gray-600 cursor-pointer hover:text-gray-800"
								onClick={closeModal}
							>
								&times;
							</span>
						</div>
						<h2 className="text-2xl mb-4">Add Todo</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="title"
								>
									Title
								</label>
								<input
									className="border rounded w-full py-2 px-3"
									type="text"
									name="title"
									id="title"
									value={formData.title}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="email"
								>
									Body
								</label>
								<input
									className="border rounded w-full py-2 px-3"
									type="text"
									name="body"
									id="body"
									value={formData.body}
									onChange={handleInputChange}
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModalAddTodo;
