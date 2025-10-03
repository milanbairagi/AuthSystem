import { simplifyDateTime, formatTimeAgo, getStatusColor } from "../../utils";

const ActivityFeed = ({ users, tasks }) => {
  return (
    <div className="w-full p-4 bg-white rounded shadow">
      <h3 className="text-xl font-bold">Activity Feed</h3>
      
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <RecentUserSection users={users} />
        <RecentTaskSection tasks={tasks} />
      </div>
    </div>
  );
};


const RecentUserSection = ({ users }) => {

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Recent Users</h3>
      
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{user.email}</p>
              <p className="font-medium text-gray-900">{simplifyDateTime(user.date_joined)}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {user.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentTaskSection = ({ tasks }) => {

  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center">Recent Tasks</h3>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-3 bg-gray-50 rounded-lg">

            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Main Content */}
                <p className="font-medium text-gray-900 truncate">{task.title}</p>
                <p className="text-sm text-gray-600">by {task.owner_email}</p>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs mr-2 ${getStatusColor(task.status)}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(task.created_at)}
                  </span>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};


export default ActivityFeed;