import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* / - Home Route */}
      <Route path="/" element={<Home />} />
      {/* /test - Route with JSX  */}
      <Route path="/test" element={<h1>Test - But not a good approch</h1>} />
      {/* /myapps - Redirect to /learn - <Learn/> Component Overlays on top of /myapps - So navigation in browser may cause some issues */}
      <Route path="/myapps" element={<Navigate to="/learn" />} />
      {/* /apps - Truely Redirect to /learn with replace - No Overlaying - NO Navigation issues */}
      <Route path="/apps" element={<Navigate replace to="/learn" />} />
      {/* /learn - Route with component <Learn /> */}
      {/* <Route path="/learn" element={<Learn />} /> */}
      {/* Nested Routes */}
      <Route path="/learn" element={<Learn />}>
        {/* /learn/courses */}
        <Route path="courses" element={<Courses />}>
          {/* /learn/courses/<any param> - Getting the param value */}
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        {/* /learn/bundles */}
        <Route path="bundles" element={<Bundles />} />
      </Route>
      {/* /dashboard - Dashboard Route - Passing data from CourseId and Receiving from Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div className="container mt-5">
      <h1>Home Route</h1>
      <Link className="btn btn-light" to="/learn">
        Learn
      </Link>
    </div>
  );
}

function Learn() {
  return (
    <div className="container mt-2">
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      {/* <a href=""></a> - Not used in React */}
      <Link className="btn btn-success m-2" to="/learn/courses">
        Courses
      </Link>

      <Link className="btn btn-primary" to="/learn/bundles">
        Bundle
      </Link>

      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "NodeJS"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <hr />
      <h1>Courses List</h1>
      <h4>Courses Cards</h4>
      <NavLink
        // Active Tab Color
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "orange" : "yellow",
          };
        }}
        className="btn m-2"
        to={`/learn/courses/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>
      <NavLink className="btn btn-light m-2" to={`/learn/courses/tests`}>
        Tests
      </NavLink>
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <hr />
      <h1>Bundles List</h1>
      <h4>Bundle Cards</h4>
    </div>
  );
}

function CourseId() {
  const navigate = useNavigate();
  // courseid because we mensioned it in the route
  const { courseid } = useParams();
  return (
    <div>
      <hr />
      <h1>
        URL Params is :{" "}
        <mark>
          <strong className="text-capitalize">{courseid}</strong>
        </mark>
      </h1>
      <button
        onClick={() => {
          // navigate(-1); -> Move one page back
          navigate("/dashboard", { state: courseid });
        }}
        className="btn btn-warning m-2"
      >
        Price
      </button>
      <Link className="btn btn-danger" to="/dashboard" state={"Django"}>
        Test Link
      </Link>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that i got her is : {location.state}</h1>
    </div>
  );
}
reportWebVitals();
