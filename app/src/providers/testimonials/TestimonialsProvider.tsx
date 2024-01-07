import { createContext, useContext } from "react";
import {
  TestimonialsContextInterface,
  TestimonialsContextProps,
} from "./interface";
import { useFemaleTestimonials } from "./hooks/useFemaleTestimonials";

const TestimonialsContext = createContext<
  TestimonialsContextInterface | undefined
>(undefined);

function TestimonialsProvider({ children }: TestimonialsContextProps) {
  const { mediaTestimonials, testimonials } = useFemaleTestimonials();

  const value = {
    mediaTestimonials,
    testimonials,
  };

  return (
    <TestimonialsContext.Provider value={value}>
      {children}
    </TestimonialsContext.Provider>
  );
}

function useTestimonialsContext() {
  const context = useContext(TestimonialsContext);

  if (context === undefined) {
    throw new Error(
      "useTestimonialsContext must be used within TestimonialsProvider"
    );
  }

  return context;
}

export { TestimonialsProvider, useTestimonialsContext };
