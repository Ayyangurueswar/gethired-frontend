import * as React from "react";
import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

export default function LoadingSpinner(props: {
    size?: number;
    color?: string;
    style?: React.CSSProperties;
  }
) {
  const { size, color, style, ...rest } = props;
  
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `4px solid ${color}`,
        borderTop: `4px solid transparent`,
        borderRadius: "50%",
        ...style,
      }}
      variants={spinnerVariants}
      animate="animate"
      {...rest}
    />
  );
}

LoadingSpinner.defaultProps = {
  size: 40,
  color: "black",
};
