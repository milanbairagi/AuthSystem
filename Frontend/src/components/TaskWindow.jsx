import { useState, useEffect } from "react";

import { shallowEqual, simplifyDateTime } from "../utils";
import useTasks from "../hooks/useTasks";
import PrimaryButton from "./Button";
import { MdOutlinePending } from "react-icons/md";
import { TbProgressCheck } from "react-icons/tb";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";


const TaskWindow = ({ task, open, handleClose }) => {
  if (!task) return null;

  const { updateTask } = useTasks();

  const [taskState, setTaskState] = useState(null);

  useEffect(() => {
    setTaskState(task);
  }, [task, open]);

  console.log("TaskWindow render:", taskState);
  
  const changeStatus = (task) => {
    const status = ["pending", "in_progress", "completed"];

    const currentIndex = status.indexOf(task.status);
    const nextIndex = (currentIndex + 1) % status.length;
    const newStatus = status[nextIndex];

    setTaskState({ ...taskState, status: newStatus });
  };

  if (!taskState) return null;

  return (
		<div
			className={`fixed top-0 right-0 h-full w-[clamp(300px,50vw,700px)]
                  bg-gray-300 shadow-lg p-4 md:p-8
                  transform transition-transform duration-300
                  ${open ? "translate-x-0" : "translate-x-full"}`}
		>
			<button
				className="p-2 rounded-lg hover:bg-gray-400 transition-colors duration-150"
				onClick={handleClose}
			>
				<ImCross />
			</button>

			<input
				className="text-2xl font-bold my-2 focus:outline-none w-full"
				value={taskState.title}
				onChange={(e) =>
					setTaskState({ ...taskState, title: e.target.value })
				}
			/>

			{/* Status */}
			<div
				className="flex items-center w-fit rounded-lg p-2 mb-4 cursor-pointer hover:bg-gray-200 hover:shadow transition-colors duration-150"
				onClick={() => changeStatus(taskState)}
			>
				{taskState.status === "pending" && (
					<MdOutlinePending
						size={32}
						className="text-blue-500 mr-4"
					/>
				)}
				{taskState.status === "in_progress" && (
					<TbProgressCheck
						size={32}
						className="text-yellow-500 mr-4"
					/>
				)}
				{taskState.status === "completed" && (
					<IoCheckmarkCircleOutline
						size={32}
						className="text-green-500 mr-4"
					/>
				)}

				<p className="text-lg font-semibold">
					{taskState.status === "pending" && "Pending"}
					{taskState.status === "in_progress" && "In Progress"}
					{taskState.status === "completed" && "Completed"}
				</p>
			</div>

			{/* Description */}
			<label className="block text-lg mb-2 font-medium text-gray-700">
				Description
			</label>
			<textarea
				className="w-full focus:outline-none bg-gray-100 p-2 rounded-lg resize-none"
				value={taskState?.description || ""}
				onChange={(e) =>
					setTaskState({
						...taskState,
						description: e.target.value,
					})
				}
			/>

			<p>Created At: {simplifyDateTime(taskState.created_at)}</p>
			<p>Updated At: {simplifyDateTime(taskState.updated_at)}</p>

			{!shallowEqual(task, taskState) && (
				<PrimaryButton
					text="Save"
					onClick={() => updateTask(taskState)}
				/>
			)}
		</div>
  );
};

export default TaskWindow;