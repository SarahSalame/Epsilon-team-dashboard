import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [snackContent, setSnackContent] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectType, setProjectType] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    navigate("/projects");
  };

  useEffect(() => {
    if (id) {
      localStorage.setItem("edit", "true");
      const fetchData = async () => {
        const docRef = doc(db, "tasks", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setPrice(data.price);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setProjectType(data.projectType);
          setAssignee(data.assignee);
          setStatus(data.status);
        } else {
          console.log("No such document!");
        }
      };
      fetchData();
    } else {
      localStorage.setItem("edit", "false");
    }

    return () => {
      localStorage.removeItem("edit");
    };
  }, [id]);

  const sendData = async (e) => {
    e.preventDefault();

    const newTask = {
      name,
      price,
      startDate,
      endDate,
      projectType,
      assignee,
      status,
    };

    try {
      if (id) {
        await setDoc(doc(db, "tasks", id), newTask);
      } else {
        const newDocRef = doc(collection(db, "tasks"));
        await setDoc(newDocRef, newTask);
      }

      setSnackContent(
        id ? "Task updated successfully" : "Task added successfully"
      );
      setOpen(true);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
      setSnackContent("Error saving task");
      setOpen(true);
    }
  };

  return (
    <div className="taskForm">
      <h1>{id ? "Edit Task" : "Add Task"}</h1>
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="taskName">
            Task Name
            <input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="input"
              type="text"
              name="taskName"
              id="taskName"
              placeholder="Task Name"
            />
          </label>
          <label htmlFor="taskPrice">
            Price
            <input
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              type="text"
              name="taskPrice"
              id="taskPrice"
              placeholder="Price"
            />
          </label>
          <label htmlFor="startDate">
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input"
              name="startDate"
              id="startDate"
            />
          </label>
          <label htmlFor="endDate">
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input"
              name="endDate"
              id="endDate"
            />
          </label>
          <label htmlFor="projectType">
            Project Type
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="input"
              id="projectType"
            >
              <option value="">Select Project Type</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Web">Web</option>
              <option value="AI">AI</option>
              <option value="UI Design">UI Design</option>
            </select>
          </label>
          <label htmlFor="assignee">
            Assignee
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="input"
              name="assignee"
              id="assignee"
              placeholder="Assignee"
            />
          </label>
          <label htmlFor="status" className="checkboxLabel">
            Task Status :
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              className="input"
              id="status"
            />
            Completed
          </label>

          <button aria-label="save the data" type="submit">
            {id ? "Update Task" : "Save Task"}
          </button>
        </div>
      </form>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            snackContent === "Task updated successfully" ||
            snackContent === "Task added successfully"
              ? "success"
              : "error"
          }
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackContent}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
