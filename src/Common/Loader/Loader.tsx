import { motion } from "framer-motion";

const NoteLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="w-20 h-28 bg-indigo-500 rounded-sm shadow-lg relative origin-left"
        animate={{ rotateY: [0, 180, 360] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-white p-2 rounded-sm backface-hidden shadow-inner" />
        <div className="absolute inset-0 bg-indigo-500 p-2 rounded-sm backface-hidden rotate-y-180 shadow-inner" />
      </motion.div>
    </div>
  );
};

export default NoteLoader;
