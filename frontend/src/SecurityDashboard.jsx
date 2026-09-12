import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function SecurityDashboard() {
  const scannerRef = useRef(null);

  const [message, setMessage] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const startScanner = async () => {
    setMessage("");
    setScanning(true);

    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          await scanner.stop();
          setScanning(false);

          try {
            const qrData = JSON.parse(decodedText);

            const token = localStorage.getItem("token");

            const response = await fetch(
              "http://localhost:5000/api/security/verify",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(qrData),
              }
            );

            const data = await response.json();

            if (!response.ok) {
              setMessage(data.message || "Verification failed");
              return;
            }

            setMessage(data.message);
          } catch (error) {
            console.error("QR verification error:", error);
            setMessage("Invalid QR code");
          }
        },
        () => {
          // Ignore continuous scanning errors
        }
      );
    } catch (error) {
      console.error("Scanner error:", error);
      setScanning(false);
      setMessage("Unable to access camera");
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
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

<h2>Security Dashboard</h2>

      <div className="card mt-4">
        <div className="card-body text-center">
          <h4>Scan Gate Pass QR Code</h4>

          <div
            id="qr-reader"
            className="mt-4"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "auto",
            }}
          ></div>

          {!scanning && (
            <button
              className="btn btn-primary mt-4"
              onClick={startScanner}
            >
              Start Scanner
            </button>
          )}

          {message && (
            <div className="alert alert-info mt-4">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecurityDashboard;