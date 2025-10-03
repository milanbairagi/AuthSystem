import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import { useUser } from "../contexts/userContext";
import useTasks from "../hooks/useTasks";
import PrimaryButton, { SecondaryButton } from "../components/Button";
import TaskCard from "../components/TaskCard";
import TaskWindow from "../components/TaskWindow";


const Header = ({ user, handleLogout, goToAdminDashboard }) => {
  return (
    <div className="container mx-auto flex items-center justify-between w-full">
      <div>
        <h2 className="text-2xl font-bold">Welcome, {user.first_name} {user.last_name}!</h2>
        <p>Email: {user.email}</p>
        {user.role === "admin" && (
          <PrimaryButton text="Go to Admin Dashboard" onClick={goToAdminDashboard} />
        )}
      </div>
      <SecondaryButton text="Log out" onClick={handleLogout} />
    </div>
  )
};


const AddTaskInput = ({ value, setValue, handleAdd }) => {

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleAdd({ value });
				setValue("");
			}}
      className="flex items-center w-full mb-4 p-4 bg-neutral-200 focus-within:bg-neutral-300 rounded-lg"
		>
      <FaPlus className="inline mr-4 text-gray-500" />
			<input
				type="text"
				placeholder="Add new task"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="w-full focus:outline-none bg-transparent"
			/>
		</form>
	);
};


const Home = () => {
  const { user, logoutUser, loading } = useUser();
  const { tasks, loading: tasksLoading, addTask, updateTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const navigate = useNavigate();

  const openTaskWindow = (task) => {
    setOpen(true);
    setSelectedTask(task);
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    console.log("Tasks updated:");
  }, [tasks]);

  const goToAdminDashboard = () => {
    navigate("/admin");
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center p-4">

      <TaskWindow task={selectedTask} open={open} handleClose={() => setOpen(false)} />

      {user && <Header user={user} handleLogout={logoutUser} goToAdminDashboard={goToAdminDashboard} />}

      <h3 className="text-gray-600 font-bold text-3xl my-4">Your Tasks</h3>
      {user && tasksLoading ? <div>Loading tasks...</div> : (
        <div className="flex-1 w-full">
        {tasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            handleClick={() => openTaskWindow(task)}
            handleUpdate={updateTask}
            handleDelete={() => deleteTask(task)} 
          />
        ))}
      </div>
      )}

      <AddTaskInput value={title} setValue={setTitle} handleAdd={() => addTask({ title })} />
    </div>
  );
};

export default Home;