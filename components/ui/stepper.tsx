/* eslint-disable react/display-name */
"use client";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  Ref,
} from "react";

// Tipagens e Contextos
type StepperState = "active" | "completed" | "inactive";
type StepperOrientation = "horizontal" | "vertical";

export interface StepperMethods {
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  totalSteps: number;
}

export interface StepperContextValue {
  currentStep: number;
  totalSteps: number;
  orientation: StepperOrientation;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface StepperRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultValue?: number;
  orientation?: StepperOrientation;
}

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stepIndex?: number; // Adicionado para uso interno do StepperRoot
}

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  step: number;
}

const StepperContext = createContext<StepperContextValue | null>(null);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper component");
  }
  return context;
};

// Root Component
export const Stepper = React.forwardRef<
  HTMLDivElement & StepperMethods,
  StepperRootProps
>(
  (
    {
      children,
      defaultValue = 1,
      orientation = "horizontal",
      className,
      ...props
    },
    ref,
  ) => {
    const [currentStep, setCurrentStep] = useState(defaultValue);

    const stepperItems = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type !== StepperContent,
    );
    const totalSteps = stepperItems.length;

    const goToStep = useCallback(
      (step: number) => {
        if (step >= 1 && step <= totalSteps) {
          setCurrentStep(step);
        }
      },
      [totalSteps],
    );

    const nextStep = useCallback(() => {
      goToStep(currentStep + 1);
    }, [currentStep, goToStep]);

    const prevStep = useCallback(() => {
      goToStep(currentStep - 1);
    }, [currentStep, goToStep]);

    const contextValue = useMemo(
      () => ({
        currentStep,
        totalSteps,
        orientation,
        goToStep,
        nextStep,
        prevStep,
        isFirstStep: currentStep === 1,
        isLastStep: currentStep === totalSteps,
      }),
      [currentStep, totalSteps, orientation, goToStep, nextStep, prevStep],
    );

    React.useImperativeHandle(ref, () => ({
      // Adiciona as propriedades do HTMLDivElement ao ref
      // e as propriedades de StepperMethods
      ...(ref as React.RefObject<HTMLDivElement>).current,
      goToStep,
      nextStep,
      prevStep,
      currentStep,
      totalSteps,
    }));

    return (
      <StepperContext.Provider value={contextValue}>
        <div
          className={cn(
            orientation === "horizontal" ? "flex flex-col" : "flex gap-8",
            className,
          )}
          {...props}
        >
          <div
            className={cn(
              "flex",
              orientation === "horizontal"
                ? "items-center mb-8"
                : "flex-col items-start",
            )}
          >
            {stepperItems.map((child, index) => {
              if (React.isValidElement<StepperItemProps>(child)) {
                return React.cloneElement(child, { stepIndex: index + 1 });
              }
              return null;
            })}
          </div>
          <div className="flex-1">
            {React.Children.map(children, (child) => {
              if (
                React.isValidElement<StepperContentProps>(child) &&
                child.type === StepperContent
              ) {
                return child;
              }
              return null;
            })}
          </div>
        </div>
      </StepperContext.Provider>
    );
  },
);

// Item do Stepper (O passo visual)
export const StepperItem = ({
  children,
  stepIndex,
  className,
  ...props
}: StepperItemProps) => {
  const { currentStep, orientation } = useStepper();
  const index = stepIndex || 0; // Default para 0 se não for passado, embora deva ser sempre passado pelo StepperRoot
  const isCompleted = currentStep > index;
  const isActive = currentStep === index;

  return (
    <div
      className={cn(
        "flex items-center group relative",
        orientation === "horizontal" ? "flex-1 last:flex-none" : "mb-4 w-full",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
            isActive || isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted text-muted-foreground",
          )}
        >
          {isCompleted ? <Check className="h-4 w-4" /> : <span>{index}</span>}
        </div>
        <div className="flex flex-col text-left">{children}</div>
      </div>
      {orientation === "horizontal" && (
        <div
          className={cn(
            "mx-4 h-[2px] flex-1 bg-muted",
            isCompleted && "bg-primary",
          )}
        />
      )}
    </div>
  );
};

// Conteúdo de cada passo
export const StepperContent = ({
  children,
  step,
  ...props
}: StepperContentProps) => {
  const { currentStep } = useStepper();
  if (currentStep !== step) return null;
  return (
    <div
      className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
      {...props}
    >
      {children}
    </div>
  );
};
