import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [gatePasses, setGatePasses] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const fetchMyGatePasses = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/gatepass/my",
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

    fetchMyGatePasses();
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

      <h2>Student Dashboard</h2>

      <div className="card mt-4">
        <div className="card-body">
          <h4>Welcome, {user?.name}</h4>

          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/student/apply")}
          >
            Apply for Gate Pass
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-5">
        <h4>My Gate Passes</h4>
      </div>

      {gatePasses.length === 0 ? (
        <div className="alert alert-info mt-3 text-center">
          You have not submitted any gate pass applications yet.
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Reason</th>
                <th>Destination</th>
                <th>Exit Date</th>
                <th>Expected Return</th>
                <th>Status</th>
                <th>QR Code</th>
              </tr>
            </thead>

            <tbody>
              {gatePasses.map((gatePass) => (
                <tr key={gatePass._id}>

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
                    {gatePass.status === "approved" &&
                    gatePass.qrCode ? (
                      <img
                        src={gatePass.qrCode}
                        alt="Gate Pass QR Code"
                        width="120"
                        height="120"
                      />
                    ) : (
                      "-"
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

export default StudentDashboard;