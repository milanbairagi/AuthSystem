import { MdOutlinePending } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

import { SecondaryButton } from "./Button";


const TaskCard = ({ task, handleClick, handleUpdate, handleDelete }) => {
  const status = ["pending", "in_progress", "completed"];

  const changeStatus = (task) => {

    const currentIndex = status.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % status.length;
    const newStatus = status[nextIndex];

    handleUpdate({ ...task, status: newStatus });
  };

  // Handle delete button click and stop propagation to parent
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <div className="flex items-center w-full bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 p-4 mb-4 rounded-lg">
      <div className="flex items-center justify-center cursor-pointer" onClick={() => changeStatus(task)}>
        {task.status === status[0] && <MdOutlinePending size={40} className="text-blue-500 mr-4" />}
        {task.status === status[1] && <TbProgressCheck size={40} className="text-yellow-500 mr-4" />}
        {task.status === status[2] && <IoCheckmarkCircleOutline size={40} className="text-green-500 mr-4" />}
      </div>

      <div className="flex-1 flex items-center justify-between" onClick={handleClick}>
        <h3 className={`text-lg font-semibold ${task.status === status[2] ? "line-through" : ""}`}>{task.title}</h3>
        <SecondaryButton
          text="Delete"
          onClick={handleDeleteClick}
          styles={"bg-red-400"}
        />
      </div>
    </div>
  );
};

export default TaskCard;