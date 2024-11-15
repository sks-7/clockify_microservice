import { Box, Menu } from "@chakra-ui/react";
import React, { useEffect } from "react";
import StopWatch from "./StopWatch";
import "./Timer.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  FaPlusCircle,
  FaStopwatch,
  FaCommentDots,
  FaDollarSign,
  FaTags,
  FaGripLinesVertical,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import SideBar from "./SideBar/SideBar";
import Inner_Navbar from "./SideBar/Inner_Navbar";
import axios from "axios";
import { useState } from "react";
import { GrPlay } from "react-icons/gr";
import { HiDotsVertical } from "react-icons/hi";
import { deleTasks, getAllTasks } from "../../graphqlQuesries/TaskQueries";
import GlobalLoader from "../gloabalLoader/gloabalLoader";

const Time_Tracker = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [taskdata, setData] = useState([]);

  const { data, loading, error } = useQuery(getAllTasks);

  const [deleteTask] = useMutation(deleTasks);


  useEffect(() => {
    if (data && data.tasks) {
      setData(data.tasks);
    }
  }, [data]);

  if (loading) return <GlobalLoader />;
  if (error) return <p>Error: {error.message}</p>;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const tracker = () => navigate("/tracker");
  const taskAdd = () => navigate("/taskadd");

  const handleDelete = (id) => {
    deleteTask({
      variables: { _id: id }, // Ensure the variable name matches `_id`
    })
      .then(response => {
        console.log("Task deleted:", response.data);
      })
      .catch(err => {
        console.error("Error deleting task:", err.message);
      });
    
    window.location.reload()
  };

  return (
    <div>
      <Box>
        <Inner_Navbar />
      </Box>
      <Box className="timePage">
        <Box className="st01">
          <SideBar />
        </Box>
        <Box className="full">
          <Box className="st">
            <div>
              <input
                type="text"
                onChange={handleNameChange}
                className="in1"
                placeholder="What are you working on?"
              />
            </div>
            <div className="bluep">
              <FaPlusCircle />
              <a href="" className="pin">
                Project
              </a>
            </div>
            <div className="bluep1">
              <FaGripLinesVertical className="hicon" />
              <FaTags className="hicon" />
              <FaGripLinesVertical className="hicon" />
              <FaDollarSign className="hicon" />
              <FaGripLinesVertical className="hicon" />
            </div>
            <div className="st2">
              {" "}
              <StopWatch name={name} />
            </div>
            <div className="bunicon">
              <button onClick={tracker}>
                <FaStopwatch />
              </button>
              <button onClick={taskAdd}>
                <FaCommentDots />
              </button>
            </div>
          </Box>
          <div className="wname">
            <h1 className="h1">This week</h1>{" "}
            <h1 className="h1">Week Total:00:00:00</h1>
          </div>
          <div className="wname wname1">
            <h1 className="h1">This week</h1>{" "}
            <h1 className="h1">Week Total:00:00:00</h1>
          </div>

          {/* MapFunction */}
          {taskdata?.map((e, i) => (
            <Box className="st" key={i}>
              <div className="A1">
                <h1>{e?.name}</h1>
              </div>
              <div className="A2">
                <FaPlusCircle />
                <a href="" className="pin">
                  Project
                </a>
              </div>
              <div className="A3">
                <FaGripLinesVertical className="hicon" />
                <FaTags className="hicon" />
                <FaGripLinesVertical className="hicon" />
                <FaDollarSign className="hicon" />
                <FaGripLinesVertical className="hicon" />
              </div>
              <div className="A4">
                <h1>{e?.startAt} </h1>-<h1> {e?.endAt}</h1>
              </div>
              <div className="A5">
                <FaRegCalendarAlt />
              </div>
              <div className="A6">
                <h1>{e.totalTime}</h1>
              </div>
              <div className="A7">
                <button>
                  <GrPlay />
                </button>
              </div>

              <div className="A7">
                <button onClick={() => handleDelete(e?._id)}>
                  <HiDotsVertical />
                </button>
              </div>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Time_Tracker;
