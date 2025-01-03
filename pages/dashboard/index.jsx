import { useNavigate } from "react-router-dom";

export default function dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/addjob")}>Create New Form</button>
      <button onClick={() => navigate("/editjob/1")}>Create New Folder</button>
    </div>
  );
}
