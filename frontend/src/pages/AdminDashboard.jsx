import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  PieChart, Pie, Cell, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer 
} from "recharts";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { 
  getAdminUsers, 
  getAdminPopularCities, 
  getAdminPopularActivities, 
  getAdminAnalytics 
} from "../lib/api";

const COLORS = ['#1f5b45', '#405047', '#8b968e', '#a7b9aa', '#d8e5d9'];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("users");
  
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If not admin, we can redirect or show unauthorized (assuming frontend knows role)
    if (user && user.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [uRes, cRes, aRes, anRes] = await Promise.all([
          getAdminUsers(),
          getAdminPopularCities(),
          getAdminPopularActivities(),
          getAdminAnalytics()
        ]);
        
        setUsers(uRes);
        setCities(cRes);
        setActivities(aRes);
        setAnalytics(anRes);
      } catch (err) {
        console.error("Admin fetch error", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (user && user.role === "ADMIN") {
      fetchData();
    }
  }, [user]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <main className="min-h-screen bg-[#f5f3ed] text-[#1b2821]">
      <Header />
      
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-11">
        <div className="mb-7">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1f5b45]">
            Admin Panel
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight text-[#1b2821] sm:text-5xl">
            Dashboard
          </h1>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p className="text-sm text-gray-500">Loading admin data...</p>
        ) : (
          <div className="bg-white rounded-xl border border-[#d8ddd6] shadow-sm overflow-hidden">
            <div className="flex border-b border-[#d8ddd6] overflow-x-auto">
              {[
                { id: "users", label: "Manage Users" },
                { id: "cities", label: "Popular Cities" },
                { id: "activities", label: "Popular Activities" },
                { id: "analytics", label: "User Trends & Analytics" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition ${
                    activeTab === tab.id 
                      ? "text-[#1f5b45] border-b-2 border-[#1f5b45] bg-[#fbfaf6]" 
                      : "text-[#68756c] hover:bg-[#fbfaf6] hover:text-[#1f5b45]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 sm:p-10 min-h-[400px]">
              {/* TAB: USERS */}
              {activeTab === "users" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">User Management</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#fbfaf6] border-b border-[#d8ddd6]">
                        <tr>
                          <th className="px-4 py-3 font-bold text-[#526159]">Name</th>
                          <th className="px-4 py-3 font-bold text-[#526159]">Email</th>
                          <th className="px-4 py-3 font-bold text-[#526159]">Role</th>
                          <th className="px-4 py-3 font-bold text-[#526159]">Trips</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f5f3ed]">
                        {users.map(u => (
                          <tr key={u.id} className="hover:bg-[#fbfaf6]">
                            <td className="px-4 py-4 font-medium">{u.firstName} {u.lastName}</td>
                            <td className="px-4 py-4 text-[#68756c]">{u.email}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ADMIN' ? 'bg-[#1f5b45] text-white' : 'bg-[#e2e8e4] text-[#405047]'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-[#68756c]">{u.trips.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB: CITIES */}
              {activeTab === "cities" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Popular Destinations</h2>
                  <div className="grid gap-4">
                    {cities.map((city, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-[#e2e8e4] bg-[#fbfaf6]">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-serif text-[#a7b9aa]">#{idx + 1}</span>
                          <div>
                            <p className="font-bold text-[#1b2821]">{city.name}</p>
                            <p className="text-xs text-[#68756c]">{city.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#1f5b45]">{city.visits}</p>
                          <p className="text-[10px] uppercase tracking-wider text-[#8b968e]">Visits</p>
                        </div>
                      </div>
                    ))}
                    {cities.length === 0 && <p className="text-sm text-gray-500">No data available.</p>}
                  </div>
                </div>
              )}

              {/* TAB: ACTIVITIES */}
              {activeTab === "activities" && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Popular Activities</h2>
                  <div className="grid gap-4">
                    {activities.map((act, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-[#e2e8e4] bg-[#fbfaf6]">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-serif text-[#a7b9aa]">#{idx + 1}</span>
                          <p className="font-bold text-[#1b2821]">{act.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#1f5b45]">{act.count}</p>
                          <p className="text-[10px] uppercase tracking-wider text-[#8b968e]">Bookings</p>
                        </div>
                      </div>
                    ))}
                    {activities.length === 0 && <p className="text-sm text-gray-500">No data available.</p>}
                  </div>
                </div>
              )}

              {/* TAB: ANALYTICS */}
              {activeTab === "analytics" && analytics && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Platform Analytics</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="bg-[#fbfaf6] border border-[#e2e8e4] rounded-xl p-6 text-center">
                      <p className="text-3xl font-serif text-[#1f5b45]">{analytics.stats.totalUsers}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#68756c] mt-2">Total Users</p>
                    </div>
                    <div className="bg-[#fbfaf6] border border-[#e2e8e4] rounded-xl p-6 text-center">
                      <p className="text-3xl font-serif text-[#1f5b45]">{analytics.stats.totalTrips}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#68756c] mt-2">Total Trips</p>
                    </div>
                    <div className="bg-[#fbfaf6] border border-[#e2e8e4] rounded-xl p-6 text-center">
                      <p className="text-3xl font-serif text-[#1f5b45]">{analytics.stats.totalPosts}</p>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#68756c] mt-2">Community Posts</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-[#fbfaf6] border border-[#e2e8e4] rounded-xl p-6">
                      <h3 className="font-bold mb-4 text-[#1b2821]">Trip Creation Trend</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={analytics.lineChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8e4" />
                            <XAxis dataKey="name" stroke="#8b968e" fontSize={12} />
                            <YAxis stroke="#8b968e" fontSize={12} />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="trips" stroke="#1f5b45" strokeWidth={3} activeDot={{ r: 8 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="bg-[#fbfaf6] border border-[#e2e8e4] rounded-xl p-6">
                      <h3 className="font-bold mb-4 text-[#1b2821]">Trip Budget Distribution</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={analytics.pieChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {analytics.pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
