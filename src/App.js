import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [fields, setFields] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFields(null);
    setError("");
  };

  const handleFieldChange = (e, key) => {
    setFields({ ...fields, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");
    setFields(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("http://localhost:8001/extract-fields", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Extraction failed");
      const data = await res.json();
      setFields(data.fields);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Life Insurance PDF Field Extraction</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" disabled={loading || !file} style={{ marginLeft: 8 }}>
          {loading ? "Extracting..." : "Extract Fields"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {fields && (
        <div style={{ marginTop: 32 }}>
          <h3>Extracted Fields (Editable)</h3>
          <div>
            {Object.entries(fields).map(([key, value]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontWeight: 600 }}>{key}</label>
                <input
                  type="text"
                  value={value || ""}
                  onChange={(e) => handleFieldChange(e, key)}
                  style={{ width: "100%", padding: 8, fontSize: 16 }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
