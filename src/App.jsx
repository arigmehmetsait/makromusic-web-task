import { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import "./App.css";
import { BsPlusSquare } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { TbPointFilled } from "react-icons/tb";

const App = () => {
  const [todoTasks, setTodoTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "High",
    },
    {
      id: 2,
      title: "Task 2",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "Low",
    },
  ]);

  const [progressTasks, setProgressTasks] = useState([
    {
      id: 3,
      title: "Task 1",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "High",
    },
    {
      id: 4,
      title: "Task 2",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "Low",
    },
  ]);

  const [doneTasks, setDoneTasks] = useState([
    {
      id: 5,
      title: "Task 1",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "High",
    },
    {
      id: 6,
      title: "Task 2",
      content: "Lorem Impus akjsndlaksnalşskd",
      type: "Low",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState(null); // Seçili görevin ID'sini saklamak için state
  const [showOnlyHigh, setShowOnlyHigh] = useState(false);

  const handleShowOnlyHigh = () => {
    setShowOnlyHigh(!showOnlyHigh); // Toggle the state when the button is clicked
  };

  const handleAddTask = (targetList) => {
    const taskTitle = window.prompt("Enter a new task title:");
    const taskContent = window.prompt("Enter task content:");
    const taskType = window.prompt("Enter task type (High or Low):");

    if (
      taskTitle !== null &&
      taskTitle.trim() !== "" &&
      (taskType === "High" || taskType === "Low")
    ) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        content: taskContent,
        type: taskType,
      };

      switch (targetList) {
        case "todo":
          setTodoTasks((prevTasks) => [...prevTasks, newTask]);
          break;
        case "progress":
          setProgressTasks((prevTasks) => [...prevTasks, newTask]);
          break;
        case "done":
          setDoneTasks((prevTasks) => [...prevTasks, newTask]);
          break;
        default:
          break;
      }
    }
  };

  const handleTaskOptionsClick = (taskId) => {
    // Bu fonksiyon, görev seçeneklerinin tıklandığında çağrılır
    setSelectedTask(taskId); // Seçili görevi ayarla
  };

  const handleMoveToProgress = () => {
    const taskToMove = todoTasks.find((task) => task.id === selectedTask);

    if (taskToMove) {
      setTodoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setProgressTasks((prevTasks) => [...prevTasks, taskToMove]);
      setSelectedTask(null);
    } else {
      const taskToMove = doneTasks.find((task) => task.id === selectedTask);

      if (taskToMove) {
        setDoneTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask)
        );
        setProgressTasks((prevTasks) => [...prevTasks, taskToMove]);
        setSelectedTask(null);
      }
    }
  };

  const handleMoveToToDo = () => {
    const taskToMove = doneTasks.find((task) => task.id === selectedTask);

    if (taskToMove) {
      setDoneTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setTodoTasks((prevTasks) => [...prevTasks, taskToMove]);
      setSelectedTask(null);
    } else {
      const taskToMove = progressTasks.find((task) => task.id === selectedTask);

      if (taskToMove) {
        setProgressTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask)
        );
        setTodoTasks((prevTasks) => [...prevTasks, taskToMove]);
        setSelectedTask(null);
      }
    }
  };

  const handleMoveToDone = () => {
    const taskToMove = progressTasks.find((task) => task.id === selectedTask);

    if (taskToMove) {
      setProgressTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
      setSelectedTask(null);
    } else {
      const taskToMove = todoTasks.find((task) => task.id === selectedTask);

      if (taskToMove) {
        setTodoTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== selectedTask)
        );
        setDoneTasks((prevTasks) => [...prevTasks, taskToMove]);
        setSelectedTask(null);
      }
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTodoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setProgressTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setDoneTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== selectedTask)
      );
      setSelectedTask(null);
    }
  };

  const taskOptionsMenu = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedTask &&
        taskOptionsMenu.current &&
        !taskOptionsMenu.current.contains(event.target)
      ) {
        setSelectedTask(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTask, taskOptionsMenu]);

  const [state, setstate] = useState(false);

  return (
    <div className="bg-secondary min-h-screen p-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl">Tasks</h1>
        <Button style={{ marginRight: "20px" }} onClick={handleShowOnlyHigh}>
          Show Only High
        </Button>
      </div>

      <div className="flex space-x-8">
        {/* To Do Box */}
        <div className="flex-1 border rounded-lg p-6 bg-slate-700 shadow-md">
          <h2 className="text-lg  flex justify-between items-center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <TbPointFilled style={{ marginRight: "2px", color: "#31D0AA" }} />
              To Do
            </div>
            <span onClick={() => handleAddTask("todo")}>
              <BsPlusSquare />
            </span>
          </h2>
          <hr
            className="border-b-2 border-gray-300 w-1/8 mb-5"
            style={{ borderColor: "#31D0AA" }}
          />

          {/* Görev listesi */}
          {todoTasks
            .filter((task) => !showOnlyHigh || task.type === "High")
            .map((task) => (
              <div
                key={task.id}
                className="relative bg-slate-900 p-4 mb-4 rounded"
                style={{ borderRadius: "10px" }}
              >
                <div className="absolute top-0 right-0 m-2">
                  <button
                    onClick={() => handleTaskOptionsClick(task.id)}
                    className="text-gray-500 hover:text-blue"
                  >
                    <BsThreeDots />
                  </button>
                </div>
                <h3 className="font-bold text-lg">
                  <div
                    className="taskType"
                    style={{
                      marginBottom: "-20px",
                      width: "55px",
                      height: "23px",
                      top: "217.81px",
                      left: "225px",
                      borderRadius: "4px",
                      fontFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 500,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: task.type === "Low" ? "#FFC895" : "#FB6E6E",
                      backgroundColor:
                        task.type === "Low" ? "#DFA87433" : "#FB6E6E2E",
                    }}
                  >
                    {task.type}
                  </div>

                  <br />

                  <div className="taskTitle mt-1">{task.title}</div>
                </h3>
                <p className="taskContent mt-3">{task.content}</p>
                {/* Açılır menü için */}
                {selectedTask === task.id && (
                  <div
                    ref={taskOptionsMenu}
                    className="absolute bottom-0 right-0 m-2 bg-gray-700 p-2 border rounded-3xl shadow-md transform translate-x-full z-50"
                  >
                    <button
                      onClick={() => handleMoveToProgress(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to Progress
                    </button>
                    <button
                      onClick={() => handleMoveToDone(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to Done
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800"
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Progress Box */}
        <div className="flex-1 border rounded-lg p-6 bg-slate-700 shadow-md">
          <h2 className="text-lg flex justify-between items-center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <TbPointFilled style={{ marginRight: "2px", color: "#FFC895" }} />
              On Progress
            </div>
            <span
              onClick={() => handleAddTask("progress")}
              className="cursor-pointer"
            >
              <BsPlusSquare />
            </span>
          </h2>
          <hr
            className="border-b-2 border-gray-300 w-1/8 mb-5"
            style={{ borderColor: "#FFC895" }}
          />

          {progressTasks
            .filter((task) => !showOnlyHigh || task.type === "High")
            .map((task) => (
              <div
                key={task.id}
                className="relative bg-slate-900 p-4 mb-4 rounded"
                style={{ borderRadius: "10px" }}
              >
                <div className="absolute top-0 right-0 m-2">
                  <button
                    onClick={() => handleTaskOptionsClick(task.id)}
                    className="text-gray-500 hover:text-black"
                  >
                    <BsThreeDots />
                  </button>
                </div>
                <h3 className="font-bold text-lg">
                  <div
                    style={{
                      marginBottom: "-20px",
                      width: "55px",
                      height: "23px",
                      top: "217.81px",
                      left: "225px",
                      borderRadius: "4px",
                      fontFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 500,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: task.type === "Low" ? "#FFC895" : "#FB6E6E",
                      backgroundColor:
                        task.type === "Low" ? "#DFA87433" : "#FB6E6E2E",
                    }}
                  >
                    {task.type}
                  </div>

                  <br />
                  <div className="taskTitle mt-1">{task.title}</div>
                </h3>
                <p className="taskContent mt-3">{task.content}</p>

                {/* Açılır menü için */}
                {selectedTask === task.id && (
                  <div
                    ref={taskOptionsMenu}
                    className="absolute bottom-0 right-0 m-2 bg-gray-700 p-2 border rounded-3xl shadow-md transform translate-x-full z-50"
                  >
                    <button
                      onClick={() => handleMoveToToDo(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to To Do
                    </button>
                    <button
                      onClick={() => handleMoveToDone(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to Done
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800"
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Done Box */}
        <div className="flex-1 border rounded-lg p-6 bg-slate-700 shadow-md">
          <h2 className="text-lg flex justify-between items-center">
            <div style={{ display: "flex", alignItems: "center" }}>
              <TbPointFilled style={{ marginRight: "2px", color: "#1AB5BC" }} />
              Done
            </div>
            <span
              onClick={() => handleAddTask("done")}
              className="cursor-pointer"
            >
              <BsPlusSquare />
            </span>
          </h2>
          <hr
            className="border-b-2 border-gray-300 w-1/8 mb-5"
            style={{ borderColor: "#1AB5BC" }}
          />

          {doneTasks
            .filter((task) => !showOnlyHigh || task.type === "High")
            .map((task) => (
              <div
                key={task.id}
                className="relative bg-slate-900 p-4 mb-4 rounded"
                style={{ borderRadius: "10px" }}
              >
                <div className="absolute top-0 right-0 m-2">
                  <button
                    onClick={() => handleTaskOptionsClick(task.id)}
                    className="text-gray-500 hover:text-black"
                  >
                    <BsThreeDots />
                  </button>
                </div>
                <h3 className="font-bold text-lg">
                  <div
                    style={{
                      marginBottom: "-20px",
                      width: "55px",
                      height: "23px",
                      top: "217.81px",
                      left: "225px",
                      borderRadius: "4px",
                      fontFamily: "Inter",
                      fontSize: "18px",
                      fontWeight: 500,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: task.type === "Low" ? "#FFC895" : "#FB6E6E",
                      backgroundColor:
                        task.type === "Low" ? "#DFA87433" : "#FB6E6E2E",
                    }}
                  >
                    {task.type}
                  </div>

                  <br />
                  <div className="taskTitle mt-1">{task.title}</div>
                </h3>
                <p className="taskContent mt-3">{task.content}</p>

                {/* Açılır menü için */}
                {selectedTask === task.id && (
                  <div
                    ref={taskOptionsMenu}
                    className="absolute bottom-0 right-0 m-2 bg-gray-700 p-2 border rounded-3xl shadow-md transform -translate-y-28 translate-x-3 z-50"
                  >
                    <button
                      onClick={() => handleMoveToToDo(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to To Do
                    </button>
                    <button
                      onClick={() => handleMoveToProgress(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800 border-b border-gray-800"
                    >
                      Move to Progress
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="block w-full text-left py-2 hover:bg-gray-800"
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
