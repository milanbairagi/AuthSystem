

const TaskWindow = ({ task, open, handleClose }) => {
  if (!task) return null;

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-[clamp(300px,50vw,700px)]
                  bg-gray-200 shadow-lg p-4 md:p-8
                  transform transition-transform duration-300
                  ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <button onClick={handleClose}>Close</button>
      <h2 className="text-2xl font-bold">{task.title}</h2>

      <p>
        {task.description || "Write a description..."}
      </p>

      <p>Status: {task.status}</p>
      <p>Created At: {task.created_at}</p>
      <p>Updated At: {task.updated_at}</p>
    </div>
  );
};

export default TaskWindow;