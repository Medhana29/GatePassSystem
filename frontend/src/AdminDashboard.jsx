import { useEffect, useState } from "react";

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [gatePasses, setGatePasses] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/gatepass/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to approve gate pass");
        return;
      }

      alert("Gate pass approved successfully!");

      setGatePasses((currentPasses) =>
        currentPasses.map((pass) =>
          pass._id === id ? data.gatePass : pass
        )
      );
    } catch (error) {
      console.error("Approval error:", error);
      alert("Unable to connect to the server");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/gatepass/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to reject gate pass");
        return;
      }

      alert("Gate pass rejected successfully!");

      setGatePasses((currentPasses) =>
        currentPasses.map((pass) =>
          pass._id === id ? data.gatePass : pass
        )
      );
    } catch (error) {
      console.error("Rejection error:", error);
      alert("Unable to connect to the server");
    }
  };

  useEffect(() => {
    const fetchGatePasses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/admin/gatepasses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch gate passes");
          return;
        }

        setGatePasses(data.gatePasses);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchGatePasses();
  }, []);

  return (
    <div className="container mt-5">

      <nav className="navbar navbar-dark bg-primary rounded px-3 mb-4">
        <span className="navbar-brand mb-0 h1">
          Gate Pass System
        </span>

        <button
          className="btn btn-light"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <h2>Admin Dashboard</h2>

      <p className="text-muted">
        Review and manage student gate pass applications.
      </p>

      <p className="mt-3">
        Welcome, <strong>{user?.name}</strong>
      </p>

      <h4 className="mt-4">Gate Pass Applications</h4>

      {gatePasses.length === 0 ? (
        <p>No gate pass applications found.</p>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">

            <thead>
              <tr>
                <th>Student</th>
                <th>Reason</th>
                <th>Destination</th>
                <th>Exit Date</th>
                <th>Expected Return</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {gatePasses.map((gatePass) => (
                <tr key={gatePass._id}>

                  <td>
                    {gatePass.student?.name || "Unknown"}
                  </td>

                  <td>{gatePass.reason}</td>

                  <td>{gatePass.destination}</td>

                  <td>
                    {new Date(
                      gatePass.exitDate
                    ).toLocaleString()}
                  </td>

                  <td>
                    {new Date(
                      gatePass.expectedReturnDate
                    ).toLocaleString()}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        gatePass.status === "approved"
                          ? "bg-success"
                          : gatePass.status === "rejected"
                          ? "bg-danger"
                          : gatePass.status === "completed"
                          ? "bg-primary"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {gatePass.status}
                    </span>
                  </td>

                  <td>
                    {gatePass.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            handleApprove(gatePass._id)
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleReject(gatePass._id)
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {gatePass.status !== "pending" && (
                      <span className="text-muted">
                        No action
                      </span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;