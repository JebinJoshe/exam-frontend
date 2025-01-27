import React, { useState, useEffect } from "react";
import { ChevronRight, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "../assests/images/image-removebg-preview.png";
import { answerDataAtom, userDataAtom } from "../stat";
import { useRecoilState } from "recoil";
import axios from "axios";

const Quiz = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const [answerData, setAnswerData] = useRecoilState(answerDataAtom);
  const [startTime,setStartTime] = useState();

  console.log(answerData,userData)

  const navigate = useNavigate();

  React.useEffect(()=>{
setStartTime(new Date());
  },[])

  // Ensure user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
    if (!userData){
        navigate("/");
    }
  }, [navigate,userData]);

  // Sample questions array (can be replaced with fetched questions)
  const questions = userData?.questions || [];

  const totalQuestions = questions.length;

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          handleNext(); // Move to the next question when time runs out
          return 60; // Reset timer
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion]);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    // Save selected option for the current question
    if (selectedOption) {
      setAnswerData((prev) => ({
        ...prev,
        [questions?.[currentQuestion]?._id]: selectedOption,
      }));
    }

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60); // Reset timer
      setSelectedOption(null); // Reset selection
    } else {
      handleSubmit(answerData);
    }
  };

  const handleSubmit = async (answers) => {
    if (answers){
    let data ={
        answers : Object?.entries(answers)?.map(([questionId, selectedAnswer]) => ({
            questionId,
            selectedAnswer,
          })) || [],
          startTime: startTime,
          endTime: new Date(),
    }
    try {
        const response = await axios.post(
            "https://exam-backend-1.onrender.com/exam/submit",
            data,
            { headers: { "Authorization": `Bearer ${userData?.token}` } }
          );
          navigate("/submit")
    } catch (error) {
        navigate("/")
        console.log(error)
    }
}

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header with logo */}
          <div className="mb-12 flex justify-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-48 w-auto object-contain"
            />
          </div>

          {/* Timer and Progress indicator */}
          <div className="mb-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Question {currentQuestion + 1}</span> of {totalQuestions}
            </div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Timer className="w-5 h-5 text-blue-500" />
              <span
                className={`${
                  timeLeft <= 10 ? "text-red-500" : "text-blue-500"
                }`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Question content */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-blue-500 mb-6 text-center">
              QUIZ
            </h1>
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              {questions?.[currentQuestion]?.questionText}
            </h2>
            <p className="border p-6 text-lg rounded-xl mt-5 text-center"> {questions?.[currentQuestion]?.codeSnippet}</p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {questions?.[currentQuestion]?.options.map((option,i) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedOption === option
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 text-gray-700 hover:bg-blue-100"
                }`}
              >
                <span className="inline-block w-8 h-8 rounded-full bg-white text-blue-500 text-center leading-8 mr-3">
                  {i}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              {currentQuestion === totalQuestions - 1 ? "Submit" : "Next"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
