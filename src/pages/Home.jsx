import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/authenticateContext";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Silent Auction</h1>

      {currentUser ? (
        <>
          <p>Welcome, {currentUser.email}!</p>
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <p>
            <a href="/login">Login</a> | <a href="/register">Register</a>
          </p>
        </>
      )}
    </div>
  );
}
