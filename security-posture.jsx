```javascript
import { useState } from "react";

const API = "https://nishverse-backend.onrender.com";

function ConnectView({ onConnect }) {
  const [arn, setArn] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = arn.includes("arn:aws:iam::");

  const connect = async () => {
    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch(`${API}/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          roleArn: arn,
          externalId: "nishverse-audit"
        })
      });

      const data = await res.json();

      if (!data.success) throw new Error("Scan failed");

      onConnect({
        arn,
        findings: data.findings
      });

    } catch (err) {
      console.error(err);
      alert("Scan failed. Check backend logs.");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Connect AWS Account</h2>

      <input
        value={arn}
        onChange={(e) => setArn(e.target.value)}
        placeholder="arn:aws:iam::123456789012:role/NishverseSecurityAuditRole"
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={connect} disabled={!valid || loading}>
        {loading ? "Scanning..." : "Connect & Scan"}
      </button>
    </div>
  );
}

function DashboardView({ session, onDisconnect }) {
  const { arn, findings } = session;

  return (
    <div style={{ padding: 40 }}>
      <h2>Connected: {arn}</h2>

      <button onClick={onDisconnect}>Disconnect</button>

      <h3 style={{ marginTop: 20 }}>Findings</h3>

      {findings.length === 0 && <p>No findings</p>}

      {findings.map((f) => (
        <div key={f.id} style={{
          border: "1px solid #ccc",
          padding: 12,
          marginBottom: 10,
          borderRadius: 6
        }}>
          <strong>{f.severity}</strong> — {f.title}
          <p>{f.description}</p>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  return session
    ? <DashboardView session={session} onDisconnect={() => setSession(null)} />
    : <ConnectView onConnect={setSession} />;
}
```
