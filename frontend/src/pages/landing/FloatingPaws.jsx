import { FaPaw } from "react-icons/fa";

const paws = [
  {
    top: "8%",
    left: "8%",
    size: "text-4xl",
    delay: "0s",
    duration: "2s",
  },
  {
    top: "18%",
    right: "10%",
    size: "text-3xl",
    delay: "0.5s",
    duration: "2.5s",
  },
  {
    top: "55%",
    left: "15%",
    size: "text-5xl",
    delay: "1s",
    duration: "3s",
  },
  {
    bottom: "12%",
    right: "18%",
    size: "text-4xl",
    delay: "1.5s",
    duration: "2.2s",
  },
  {
    bottom: "28%",
    left: "45%",
    size: "text-3xl",
    delay: "2s",
    duration: "2.8s",
  },
];

export default function FloatingPaws() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {paws.map((paw, index) => (
        <FaPaw
          key={index}
          className={`absolute ${paw.size} text-orange-300/20 animate-bounce`}
          style={{
            top: paw.top,
            left: paw.left,
            right: paw.right,
            bottom: paw.bottom,
            animationDelay: paw.delay,
            animationDuration: paw.duration,
          }}
        />
      ))}
    </div>
  );
}