import React, { useRef, useState, TouchEvent, MouseEvent } from "react";
import { FaChevronRight } from "react-icons/fa6";

interface SwipeButtonProps {
  setGoalsStates: (states: {
    isWorkout: boolean;
    isRead: boolean;
    isStep: boolean;
    isSleep: boolean;
    isWater: boolean;
  }) => void;
  setProgress: (progress: number) => void;
}

const SwipeButton: React.FC<SwipeButtonProps> = ({
  setGoalsStates,
  setProgress,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    setIsDragging(true);
    setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
  };

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;

    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diffX = currentX - startX;
    const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
    const containerWidth = buttonRef.current?.parentElement?.offsetWidth ?? 0;

    if (diffX > 0 && diffX < containerWidth - buttonWidth) {
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translateX(${diffX}px)`;
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (!isDragging) return;

    const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
    const containerWidth = buttonRef.current?.parentElement?.offsetWidth ?? 0;
    const currentX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diffX = currentX - startX;

    setIsDragging(false);

    if (diffX > containerWidth / 2 - buttonWidth / 2) {
      setIsSwiped(true);
      setGoalsStates({
        isWorkout: true,
        isRead: true,
        isStep: true,
        isSleep: true,
        isWater: true,
      });
      setProgress(100);
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translateX(${
          containerWidth - buttonWidth - 14
        }px)`;
      }
    } else {
      setIsSwiped(false);
      setGoalsStates({
        isWorkout: false,
        isRead: false,
        isStep: false,
        isSleep: false,
        isWater: false,
      });
      setProgress(0);
      if (buttonRef.current) {
        buttonRef.current.style.transform = "";
      }
    }
  };

  return (
    <div
      className={`relative w-full h-16 ${
        !isSwiped ? "bg-[#D15439]" : "bg-green-500"
      } rounded-full overflow-hidden flex items-center justify-between`}
    >
      <div
        className={`absolute top-2 left-2 right-2 w-12 md:w-48 h-12 bg-gray-300 rounded-full flex justify-center items-center ${
          !isSwiped ? "text-[#D15439]" : "text-green-500"
        } font-bold cursor-pointer transition-transform duration-300 ${
          isSwiped ? "bg-[#D15439]" : ""
        }`}
        ref={buttonRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
      >
        Track
      </div>
      <div className="flex items-center justify-center w-full md:m-0 ml-14">
        {!isSwiped ? (
          <p className="text-gray-300 md:text-2xl text-sm text-center font-bold">
            Swipe to track all
          </p>
        ) : (
          <p className="text-gray-300 md:text-2xl text-sm text-center font-bold">
            All goals tracked
          </p>
        )}
      </div>
      <div className="flex mr-2">
        <FaChevronRight className="text-zinc-300" />
        <FaChevronRight className="text-zinc-200" />
        <FaChevronRight className="text-zinc-100" />
      </div>
    </div>
  );
};

export default SwipeButton;
