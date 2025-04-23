import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Table.css";
import editIcon from "../../assets/imgs/edit.svg";
import binIcon from "../../assets/imgs/bin.svg";

const Table = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const tasksList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return (
    <div className="tableContainer">
      <div className="header">
        <span>Team Tasks</span>
        <button
          onClick={() => {
            localStorage.setItem("edit", "false");
            navigate("/add");
          }}
        >
          Add Task
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Type</th>
            <th>Assigned to</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="7" className="emptyData">
                No tasks added yet.
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.projectType}</td>
                <td>{task.assignee}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>
                  {task.status ? (
                    <span style={{ color: "green" }}>✔ Done</span>
                  ) : (
                    <span style={{ color: "orange" }}>In Progress</span>
                  )}
                </td>
                <td>
                  <div className="buttons-container">
                    <button
                      aria-label="go to /edit page"
                      onClick={() => {
                        localStorage.setItem("edit", "true");
                        navigate(`/edit/${task.id}`);
                      }}
                    >
                      <img
                        src={editIcon}
                        alt="edit"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                    <button
                      aria-label="delete item"
                      onClick={() => handleDelete(task.id)}
                    >
                      <img
                        src={binIcon}
                        alt="delete"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mobileTable">
        {tasks.length === 0 ? (
          <p className="emptyData">No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="taskCard">
              <p>
                <strong>Project Name:</strong> {task.name}
              </p>
              <p>
                <strong>Type:</strong> {task.projectType}
              </p>
              <p>
                <strong>Assigned To:</strong> {task.assignee}
              </p>
              <p>
                <strong>Start Date:</strong> {task.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {task.endDate}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {task.status ? (
                  <span style={{ color: "green" }}>✔ Done</span>
                ) : (
                  <span style={{ color: "orange" }}>⏳ In Progress</span>
                )}
              </p>
              <div className="buttons-container">
                <button
                  onClick={() => {
                    localStorage.setItem("edit", "true");
                    navigate(`/edit/${task.id}`);
                  }}
                >
                  <img src={editIcon} alt="edit" />
                </button>
                <button onClick={() => handleDelete(task.id)}>
                  <img src={binIcon} alt="delete" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
