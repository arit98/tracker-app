import React from "react";
import { BsBullseye } from "react-icons/bs";

interface HeaderProps {
  goalsStates: Record<string, boolean>;
  goalsData: any[];
  progress: number;
}

const Header: React.FC<HeaderProps> = ({ goalsStates, goalsData, progress }) => {
  const completedGoals = Object.values(goalsStates).filter(Boolean).length;
  const totalGoals = goalsData.length;

  return (
    <div className="w-full bg-gradient-to-r from-[#79A6CF] to-[#1B7CD7] h-20 rounded-xl flex items-center justify-between p-4 sm:p-6 md:h-24">
      <div className="flex items-center justify-start w-1/4 sm:w-1/5">
        <BsBullseye className="text-3xl sm:text-4xl md:text-5xl text-white" />
      </div>
      <div className="flex flex-col items-end justify-center w-3/4 sm:w-4/5">
        <div className="flex flex-col items-end sm:items-start">
          {completedGoals < totalGoals && completedGoals !== 0 ? (
            <p className="text-xs sm:text-sm md:text-base text-white">
              Your Daily Goal Almost Done
            </p>
          ) : completedGoals === 0 ? (
            <p className="text-xs sm:text-sm md:text-base text-white">
              Complete at least one goal
            </p>
          ) : (
            <p className="text-xs sm:text-sm md:text-base text-white">
              Your Daily Goal is Done
            </p>
          )}
          <p className="text-xs sm:text-sm md:text-base text-white">
            {completedGoals} Of {totalGoals} Completed
          </p>
          <div className="flex items-center gap-x-2 sm:gap-x-3 w-full mt-1 sm:mt-2">
            <div
              className="flex w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="flex flex-col justify-center rounded-full overflow-hidden bg-white text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="w-8 sm:w-10 text-end">
              <span className="text-xs sm:text-sm text-gray-800 dark:text-white">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
