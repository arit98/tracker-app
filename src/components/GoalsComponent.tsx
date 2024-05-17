import React from "react";
import { TiTick, TiTimes } from "react-icons/ti";

interface Goal {
  icon: React.ComponentType<{ className?: string, style?: React.CSSProperties }>;
  color: string;
  text: string;
  state: string;
}

interface GoalsComponentProps {
  goal: Goal;
  index: number;
  goalsStates: { [key: string]: boolean };
  handleGoalToggle: (state: string) => void;
}

const GoalsComponent: React.FC<GoalsComponentProps> = ({ goal, index, goalsStates, handleGoalToggle }) => {
  return (
    <div
      key={index}
      className="w-full bg-[#282828] h-12 rounded-xl flex items-center justify-center"
    >
      <div className="w-full flex items-center pl-4 gap-2">
        <div className="h-8 w-8 rounded-lg bg-[#3D3D3D] flex items-center justify-center">
          <goal.icon className="text-xl" style={{ color: goal.color }} />
        </div>
        <p className="text-white">{goal.text}</p>
      </div>
      <div className="pr-4">
        <div
          onClick={() => handleGoalToggle(goal.state)}
          className="h-8 w-8 rounded-lg flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: goal.color }}
        >
          {goalsStates[goal.state] ? (
            <TiTick className="text-white text-xl" />
          ) : (
            <TiTimes className="text-white text-xl" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsComponent;
