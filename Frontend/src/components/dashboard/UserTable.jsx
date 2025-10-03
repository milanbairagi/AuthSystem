import { simplifyDateTime } from "../../utils";

import PrimaryButton from "../Button";


const UserTable = ({ users, changeRole }) => {

  return (
    <div className="w-full p-4 bg-white rounded shadow overflow-x-scroll">
      <h3 className="text-xl font-bold">User Table</h3>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Date Joined</th>
            <th className="px-4 py-3 text-left">Tasks</th>
            <th className="**px**-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 text-left text-nowrap">{user.email}</td>
              <td className="px-4 py-3 text-left text-nowrap">{user.name}</td>
              <td className="px-4 py-3 text-left text-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-left text-nowrap">{simplifyDateTime(user.date_joined)}</td>
              <td className="px-4 py-3 text-left text-nowrap">{user.tasks}</td>
              <td className="px-4 py-3 text-left text-nowrap"><PrimaryButton text="Change Role" onClick={() => changeRole(user.id)} /></td>
              {/* <td className="px-4 py-3 text-center"><ChangeRoleButton onClick={() => handleToggleChangeButton(user.id)} /></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;