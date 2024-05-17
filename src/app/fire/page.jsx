"use client";
import React, { useEffect, useState } from "react";
import { IoIosFitness } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { IoFootstepsSharp, IoWater, IoFitness } from "react-icons/io5";
import { GiNightSleep } from "react-icons/gi";
import BarChart from "@/components/BarChart";
import GoalsComponents from "@/components/GoalsComponent.tsx";
import SwipeButton from "@/components/SwipeButton";
import Header from "@/components/Header";

const goalsData = [
  {
    icon: IoIosFitness,
    text: "Workout for 20 mins",
    state: "isWorkout",
    color: "#9E4CB8",
  },
  {
    icon: BsFire,
    text: "Read book for 15 mins",
    state: "isRead",
    color: "#D15439",
  },
  {
    icon: IoFootstepsSharp,
    text: "30 mins walk",
    state:
    "isStep",
    color: "#81B47D",
  },
  {
    icon: GiNightSleep,
    text: "Sleep at 11 sharp",
    state: "isSleep",
    color: "#63A7A7",
  },
  {
    icon: IoWater,
    text: "Drink 3L water",
    state: "isWater",
    color: "#578DC5",
  },
];

const HomePage = () => {
  const [goalsStates, setGoalsStates] = useState({
    isWorkout: false,
    isRead: false,
    isStep: false,
    isSleep: false,
    isWater: false,
  });

  const calculateProgress = (states) => {
    const completedGoals = Object.values(states).filter(Boolean).length;
    return (completedGoals / goalsData.length) * 100;
  };

  const [progress, setProgress] = useState(calculateProgress(goalsStates));

  const handleGoalToggle = (goal) => {
    setGoalsStates((prevState) => {
      const newState = {
        ...prevState,
        [goal]: !prevState[goal],
      };
      setProgress(calculateProgress(newState));
      return newState;
    });
  };

  const [initialBarWidth, setInitialBarWidth] = useState(90);

  useEffect(() => {
    const updateBarWidth = () => {
      setInitialBarWidth(window.innerWidth < 768 ? 10 : 40);
    };

    updateBarWidth();
    window.addEventListener("resize", updateBarWidth);
    return () => window.removeEventListener("resize", updateBarWidth);
  }, []);

  const data = {
    labels: ["28/4", "30/4", "02/5", "05/5", "11/5", "15/5", "15/5", "22/5"],
    datasets: [
      {
        label: "Percentage",
        data: [92, 100, 98, 90, 84, 82, 80, 80],
        backgroundColor: "#1B7CD7",
        barThickness: initialBarWidth,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      y: {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center w-[80%] m-auto mt-12 gap-4 mb-16 select-none">
      <Header goalsStates={goalsStates} goalsData={goalsData} progress={progress} />

      <div className="flex items-center justify-between w-full mt-4 mb-4">
        <p className="text-white">Today's Goal</p>
        <IoFitness className="text-2xl md:text-3xl text-red-500 animate-pulse" />
      </div>
      {/* goals */}
      {goalsData.map((goal, index) => (
        <GoalsComponents
          key={index}
          goal={goal}
          index={index}
          goalsStates={goalsStates}
          handleGoalToggle={handleGoalToggle}
        />
      ))}
      {/* button */}
      <SwipeButton setGoalsStates={setGoalsStates} setProgress={setProgress} />
      {/*  */}
      <div className="w-full bg-[#282828] rounded-xl p-2">
        <BarChart data={data} options={options} />
      </div>
    </div>
  );
};

export default HomePage;
