import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";
import MetricCard from "../components/dashboard/MetricCard";
import UserTable from "../components/dashboard/UserTable";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import PrimaryButton from "../components/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);

  // loading states
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingRecentUsers, setLoadingRecentUsers] = useState(true);
  const [loadingRecentTasks, setLoadingRecentTasks] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const res = await api.get("/v1/admin/stats");
        setStats(res.data[0]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const res = await api.get("/v1/admin/users");
        setUsers(res.data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        setLoadingRecentUsers(true);
        const res = await api.get("/v1/admin/recent-users");
        setRecentUsers(res.data.results);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingRecentUsers(false);
      }
    };

    fetchRecentUsers();
  }, []);

  useEffect(() => {
    const fetchRecentTasks = async () => {
      try {
        setLoadingRecentTasks(true);
        const res = await api.get("/v1/admin/recent-tasks");
        setRecentTasks(res.data.results);
      } catch (error) {
        console.error("Error fetching recent tasks:", error);
      } finally {
        setLoadingRecentTasks(false);
      }
    };

    fetchRecentTasks();
  }, []);

  const changeRole = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const newRole = user.role === "admin" ? "user" : "admin";

    try {
      const res = await api.patch(`/v1/admin/users/${userId}/role/`, {
			role: newRole,
		});
		if (res.status === 200) {
			setUsers((prevUsers) =>
				prevUsers.map((u) =>
					u.id === userId ? { ...u, role: newRole } : u
				)
			);
		}

    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-6">
      <PrimaryButton text="Back to Home" onClick={() => {navigate("/")}} />
      <h2 className="text-2xl font-bold pl-4">Admin Dashboard</h2>
      <div className="grid md:grid-cols-4 gap-4 place-items-center">
        {loadingStats ? (
          <>
            <LoadingSpinner />
            <LoadingSpinner />
            <LoadingSpinner />
            <LoadingSpinner />
          </>
        ) : (
          <>
            <MetricCard title="Total Users" value={stats.total_users} />
            <MetricCard title="Total Tasks" value={stats.total_tasks} />
            <MetricCard title="Total Pending Tasks" value={stats.total_pending_tasks} />
            <MetricCard title="Total Completed Tasks" value={stats.total_completed_tasks} />
          </>
        )}
      </div>

      {loadingUsers ? <LoadingSpinner /> : <UserTable users={users} changeRole={changeRole} />}
      {(loadingRecentUsers || loadingRecentTasks) ? <LoadingSpinner /> : <ActivityFeed users={recentUsers} tasks={recentTasks} />}
    </div>
  );
};

export default AdminDashboard;