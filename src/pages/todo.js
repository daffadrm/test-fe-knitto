import { useState } from 'react';
import Swal from 'sweetalert2';
import { TodoItem } from '@/components/General/TodoItem';
import ModalAddTodo from '@/components/General/ModalAddTodo';
import { useCreateTodoMutation, useGetTodosQuery } from 'src/services/todoApi';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const TodoPage = () => {
	const [currentPage, setcurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		body: '',
		userId: 1,
	});

	const {
		data: todos,
		isLoading,
		isError,
		refetch,
		isFetching,
	} = useGetTodosQuery({
		page: currentPage,
		_limit: 10,
	});
	const [createTodo] = useCreateTodoMutation();

	const handlePageChange = (newPage) => {
		setcurrentPage(newPage);
	};

	const totalTodos = 200;

	const startItem = (currentPage - 1) * 10 + 1;
	const endItem = Math.min(currentPage * 10, totalTodos);

	if (isLoading || isFetching) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error fetching data</p>;
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createTodo(formData);
			await refetch();
			setFormData({});
			closeModal();
			Swal.fire({
				position: 'center',
				icon: 'success',
				title: 'Data Berhasil disimpan',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.error('Error submitting the form:', error);
		}
	};

	const removeTodo = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Deleted!',
					text: 'Your file has been deleted.',
					icon: 'success',
				});
			}
		});
	};
	return (
		<>
			<div className="text-center text-5xl text-blue-700">Todo List</div>
			<div class="my-4 flex space-x-4">
				<button
					className="uppercase font-semibold tracking-wider px-4 py-2 rounded text-white bg-blue-600"
					onClick={openModal}
				>
					Add to-do
				</button>
			</div>
			{todos?.map((todo) => (
				<TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} />
			))}
			{todos.length === 0 && (
				<div className="text-center">Data tidak tersedia </div>
			)}

			<div className="flex items-center gap-4 justify-center p-4">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center gap-2"
				>
					<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
					Previous
				</button>
				<div className="flex items-center gap-2">
					<span>
						{startItem}-{endItem} of {totalTodos}
					</span>
				</div>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					className="flex items-center gap-2"
					disabled={todos.length < 10}
				>
					Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
				</button>
			</div>
			<ModalAddTodo
				formData={formData}
				isModalOpen={isModalOpen}
				openModal={openModal}
				closeModal={closeModal}
				handleSubmit={handleSubmit}
				handleInputChange={handleInputChange}
			/>
		</>
	);
};

export default TodoPage;
