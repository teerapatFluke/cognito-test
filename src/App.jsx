import { useState } from "react";
import { signIn } from "aws-amplify/auth";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signIn({ username, password });
      alert("Login Successful");
    } catch (e) {
      console.log(e);
      setError("Login Failed");
    }
    setLoading(false);
  };

  const handleOIDCLogin = async () => {
    try {
      await signIn({ provider: "OIDC" });
    } catch {
      setError("OIDC Login Failed");
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
          <hr className="my-4" />
          <button
            className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
            onClick={handleOIDCLogin}
          >
            Sign In with OIDC
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
