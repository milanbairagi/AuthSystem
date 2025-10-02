import MetricCard from "../components/dashboard/MetricCard";
import UserTable from "../components/dashboard/UserTable";
import ActivityFeed from "../components/dashboard/ActivityFeed";


const AdminDashboard = () => {
  return (
    <div>
      <MetricCard />
      <UserTable />
      <ActivityFeed />
      Admin Dashboard
    </div>
  );
};

export default AdminDashboard;