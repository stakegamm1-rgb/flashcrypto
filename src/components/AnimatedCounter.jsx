import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform, animate, useInView, motion } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { 
        duration: duration, 
        ease: "easeOut" 
      });
      return () => controls.stop();
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
