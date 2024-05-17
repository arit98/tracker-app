import React, {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";
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
  const [offsetX, setOffsetX] = useState(0);
  const [isSwiped, setIsSwiped] = useState(false);

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const diffX = clientX - startX;
        setOffsetX(diffX);
      };

      const handleEnd = () => {
        setIsDragging(false);
        // @ts-ignore
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("mouseup", handleEnd);
        // @ts-ignore
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("touchend", handleEnd);

        const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
        const containerWidth =
          buttonRef.current?.parentElement?.offsetWidth ?? 0;

        if (offsetX > containerWidth / 2 - buttonWidth / 2) {
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

      // @ts-ignore
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleEnd);
      // @ts-ignore
      window.addEventListener("touchmove", handleMove);
      window.addEventListener("touchend", handleEnd);
    }
  }, [isDragging, offsetX, setGoalsStates, setProgress, startX]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent text selection while dragging
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
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
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          transform: `translateX(${offsetX}px)`,
        }}
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
