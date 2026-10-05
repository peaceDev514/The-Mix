import { useEffect, useRef } from "react";

const Reveal = ({ children, className = "" }) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("show");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};

export default Reveal;
