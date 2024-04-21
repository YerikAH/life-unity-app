import React, { useState } from 'react';
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

export function HealthForm({handleOpenForm, handleSetDrop}) {
  const [step, setStep] = useState(1);
  const [isMeasures, setIsMeasures] = useState({
    weight: "kg",
    height: "cm",
    goal: "kg",
  });
  const [isGender, setIsGender] = useState("");
  const [isActivity, setIsActivity] = useState("");
  const [isAge, setIsAge] = useState("");
  const [isGoal, setIsGoal] = useState("");


  const handleMeasures = (type, value) => {
    setIsMeasures({
      ...isMeasures,
      [type]: value,
    });
  };

  const handleGender = (type) => {
    setIsGender(type);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="inset-0 fixed bg-black/30 z-20">
      <div className="fixed inset-0 w-screen flex items-center justify-center">
        <div
          id="step1"
          className="m-auto flex flex-col items-center gap-3 pb-10 bg-white rounded-2xl p-6">
          <div className="w-full">
            <button onClick={()=>{
              handleOpenForm();
              handleSetDrop();
            }}>
              <IconX stroke={2} />
            </button>
          </div>
          <div className="flex w-full items-center justify-center relative">
          {step !== 1 && (
              <button id="back" type="button" className="flex items-center gap-2 w-[100px] absolute left-0" onClick={handleBack}>
                <IconChevronLeft />
                Back
              </button>
            )}
            <h3 className="text-lg font-semibold">{step}/3</h3>
            {step !== 3 && (
              <button id="next" type="button" className="flex items-center gap-2 w-[100px] absolute right-0" onClick={handleNext}>
                Next
                <IconChevronRight />
              </button>
            )}
          </div>
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 isMeasures={isMeasures} isGender={isGender} handleGender={handleGender} handleMeasures={handleMeasures} />}
          {step === 3 && <Step3 />}
        </div>
      </div>
    </div>
  );
}
