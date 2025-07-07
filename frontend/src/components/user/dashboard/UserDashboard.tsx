import { useEffect, useState } from "react";

// Dummy types
type User = {
  name: string;
  email: string;
  phone: string;
};

type Order = {
  id: string;
  product: string;
  amount: number;
  status: string;
};

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-300 rounded ${className}`} />
);

const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUser({
        name: "Piyash Saha",
        email: "piyash@example.com",
        phone: "+880123456789",
      });
      setOrders([
        { id: "1", product: "React Hoodie", amount: 1500, status: "Delivered" },
        { id: "2", product: "Node.js Mug", amount: 400, status: "Pending" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>

      {/* Personal Info */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ) : (
          <div className="space-y-1">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Phone:</strong> {user?.phone}</p>
          </div>
        )}
      </div>

      {/* Orders */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-3">Your Orders</h3>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((_, idx) => (
              <div key={idx} className="space-y-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{order.product}</p>
                  <p className="text-sm text-gray-600">৳ {order.amount}</p>
                </div>
                <span className={`text-sm font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-500'}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
