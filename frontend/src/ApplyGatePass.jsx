import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ApplyGatePass() {
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [expectedReturnDate, setExpectedReturnDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (expectedReturnDate <= exitDate) {
      alert("Expected return date must be after the exit date.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/gatepass/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason,
            destination,
            exitDate,
            expectedReturnDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to apply for gate pass");
        return;
      }

      alert("Gate pass application submitted successfully!");

      setReason("");
      setDestination("");
      setExitDate("");
      setExpectedReturnDate("");
    } catch (error) {
      console.error("Application error:", error);
      alert("Unable to connect to the server");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">

              <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/student")}
              >
                Back to Dashboard
              </button>

              <h2 className="text-center mb-2">
  Apply for Gate Pass
</h2>

<p className="text-center text-muted mb-4">
  Fill in the details below to submit your gate pass request.
</p>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Reason
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Destination
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Exit Date
                  </label>

                  <input
                    type="datetime-local"
                    className="form-control"
                    value={exitDate}
                    onChange={(e) =>
                      setExitDate(e.target.value)
                    }
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Expected Return Date
                  </label>

                  <input
                    type="datetime-local"
                    className="form-control"
                    value={expectedReturnDate}
                    onChange={(e) =>
                      setExpectedReturnDate(e.target.value)
                    }
                    min={exitDate || new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Submit Application
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplyGatePass;