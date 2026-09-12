import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else if (data.user.role === "security") {
        window.location.href = "/security";
      } else {
        window.location.href = "/student";
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow border-0">
            <div className="card-body p-4">

              <div className="text-center mb-4">
                <h2 className="fw-bold">Gate Pass System</h2>
                <p className="text-muted">
                  Login to continue
                </p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
  <button
    className="btn btn-link"
    onClick={() => {
      window.location.href = "/register";
    }}
  >
    Don't have an account? Register
  </button>
</div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;