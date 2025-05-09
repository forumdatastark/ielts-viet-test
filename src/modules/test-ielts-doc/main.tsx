// pages/ielts-test.tsx
import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/images";
import PassageProgressBar from "./components/processing-bar";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Grid2x2Check,
} from "lucide-react";
import Link from "next/link";
import PassageProgressBarMobile from "./components/processing-bar-mobile";
import { motion, AnimatePresence } from "framer-motion";

const PopupMenu = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Section data
  const sections = [
    {
      id: 1,
      answeredQuestions: 7,
      totalQuestions: 13,
      questionRange: Array.from({ length: 13 }, (_, i) => i + 1),
    },
    {
      id: 2,
      answeredQuestions: 4,
      totalQuestions: 13,
      questionRange: Array.from({ length: 13 }, (_, i) => i + 14),
    },
    {
      id: 3,
      answeredQuestions: 8,
      totalQuestions: 14,
      questionRange: Array.from({ length: 14 }, (_, i) => i + 27),
    },
  ];

  const getQuestionStatus = (sectionId: number, questionNum: number) => {
    const section = sections.find((s) => s.id === sectionId);
    const questionIndex = section ? questionNum - section.questionRange[0] : -1;
    return section ? questionIndex < section.answeredQuestions : false;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 z-30"
        >
          <div className="bg-white rounded-t-[40px] shadow-lg w-full max-w-md mx-auto overflow-hidden">
            <div className="bg-black w-32 h-[4px] rounded-full mx-auto mt-3"></div>
            {/* Header */}
            <div className="px-6 pb-0 pt-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Lưu ý</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Instruction */}
            <div className="px-6 py-3">
              <p className="text-gray-700 text-xs">
                Bạn có thể review và sửa lại đáp án ở các sections 1, 2, và 3.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  selectedTab === 0
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab(0)}
              >
                Section 1
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  selectedTab === 1
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab(1)}
              >
                Section 2
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium text-sm ${
                  selectedTab === 2
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab(2)}
              >
                Section 3
              </button>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
              {selectedTab === 0 && (
                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-3">SECTION 1</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {sections[0].questionRange.map((num) => (
                      <div
                        key={num}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
                          getQuestionStatus(1, num)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedTab === 1 && (
                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-3">SECTION 2</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {sections[1].questionRange.map((num) => (
                      <div
                        key={num}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
                          getQuestionStatus(2, num)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selectedTab === 2 && (
                <div className="mb-5">
                  <h3 className="text-sm font-bold mb-3">SECTION 3</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {sections[2].questionRange.map((num) => (
                      <div
                        key={num}
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium ${
                          getQuestionStatus(3, num)
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="px-4 py-5">
              <button
                onClick={() => alert("Answers submitted!")}
                className="w-full py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition duration-150"
              >
                Submit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ReadingTestClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeLeft, setTimeLeft] = useState("57:25");
  const [selectedPassage, setSelectedPassage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [switchReading, setSwitchReading] = useState(true);

  const passages = [
    { id: 1, startQuestion: 1, endQuestion: 13, answeredQuestions: 7 },
    { id: 2, startQuestion: 14, endQuestion: 26, answeredQuestions: 4 },
    { id: 3, startQuestion: 27, endQuestion: 40, answeredQuestions: 8 },
  ];

  // Generate questions for each passage
  const passageQuestions = [
    // Passage 1: Questions 1-13
    [
      { id: 1, text: "to direct the tunnelling" },
      { id: 2, text: "water runs into a _____ used by local people" },
      { id: 3, text: "vertical shafts to remove earth and for _____" },
      { id: 4, text: "_____ made of wood or stone" },
      { id: 5, text: "_____ attached to the plumb line" },
      { id: 6, text: "handholds and footholds used for _____" },
      { id: 7, text: "traditional irrigation system" },
      { id: 8, text: "underground water channels" },
      { id: 9, text: "mountain slope construction" },
      { id: 10, text: "_____ for water distribution" },
      { id: 11, text: "ancient engineering technique" },
      { id: 12, text: "_____ used in arid regions" },
      { id: 13, text: "maintenance of the system" },
    ],
    // Passage 2: Questions 14-26
    [
      { id: 14, text: "early farming methods" },
      { id: 15, text: "crop rotation benefits" },
      { id: 16, text: "soil fertility was maintained by _____" },
      { id: 17, text: "_____ used for plowing" },
      { id: 18, text: "seasonal planting schedule" },
      { id: 19, text: "irrigation improvements" },
      { id: 20, text: "_____ increased crop yields" },
      { id: 21, text: "traditional tools included _____" },
      { id: 22, text: "harvesting techniques" },
      { id: 23, text: "storage methods for _____" },
      { id: 24, text: "_____ prevented soil erosion" },
      { id: 25, text: "animal husbandry role" },
      { id: 26, text: "_____ fertilizer source" },
    ],
    // Passage 3: Questions 27-40
    [
      { id: 27, text: "industrial revolution impact" },
      { id: 28, text: "steam engine was invented by _____" },
      { id: 29, text: "factory system development" },
      { id: 30, text: "_____ replaced hand tools" },
      { id: 31, text: "urban population growth" },
      { id: 32, text: "working conditions in _____" },
      { id: 33, text: "child labor was common in _____" },
      { id: 34, text: "_____ improved transportation" },
      { id: 35, text: "coal mining expansion" },
      { id: 36, text: "_____ powered machinery" },
      { id: 37, text: "textile industry changes" },
      { id: 38, text: "_____ invention increased production" },
      { id: 39, text: "social reforms addressed _____" },
      { id: 40, text: "economic growth factors" },
    ],
  ];

  const handlePassageSelect = (passageId: number) => {
    setSelectedPassage(passageId);
    setCurrentPage(passageId);
  };

  // Move to next passage
  const handleNextPassage = () => {
    const nextPassage =
      selectedPassage < passages.length ? selectedPassage + 1 : 1;
    handlePassageSelect(nextPassage);
  };

  // Move to previous passage
  const handlePreviousPassage = () => {
    const prevPassage =
      selectedPassage > 1 ? selectedPassage - 1 : passages.length;
    handlePassageSelect(prevPassage);
  };

  const currentQuestions = passageQuestions[selectedPassage - 1];

  const currentPassage = passages[selectedPassage - 1];

  // Generate question numbers for the current passage only
  const passageQuestionNumbers = Array.from(
    { length: currentPassage.endQuestion - currentPassage.startQuestion + 1 },
    (_, i) => currentPassage.startQuestion + i
  );

  // Determine which questions are answered
  const getAnsweredStatus = (questionNum: number) => {
    const questionIndex = questionNum - currentPassage.startQuestion + 1;
    return questionIndex <= currentPassage.answeredQuestions;
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2 z-20">
        <div className="hidden lg:flex items-center w-[10%] py-3">
          <Image
            src={IMAGES.LOGO}
            alt="DOL DINH LUC"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
        <div className="text-center">
          <div className="font-semibold">IELTS Reading Test</div>
          <div className="text-sm text-gray-600">CAM13 - Reading Test 4</div>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{timeLeft}</span>
          </div>
          <Link href="/" className="text-gray-400 hover:text-gray-600 ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="fixed top-[0px] bottom-[0px] left-0 right-0 grid grid-cols-1 lg:grid-cols-2 w-full overflow-y-auto pb-20 pt-14">
        {/* Reading passage */}
        <div
          className={`p-4 pt-8 overflow-y-auto border-r border-gray-200 ${
            switchReading ? "" : "hidden lg:block"
          }`}
        >
          {selectedPassage === 1 && (
            <div>
              <h1 className="w-full text-xl font-bold mb-4">Title 1</h1>
              <p className="mb-4 text-sm">Passage 1</p>
            </div>
          )}
          {selectedPassage === 2 && (
            <div>
              <h1 className="w-full text-xl font-bold mb-4">Title 2</h1>
              <p className="mb-4 text-sm">Passage 2</p>
            </div>
          )}
          {selectedPassage === 3 && (
            <div>
              <h1 className="w-full text-xl font-bold mb-4">Title 3</h1>
              <p className="mb-4 text-sm">Passage 3</p>
            </div>
          )}
        </div>

        {/* Questions */}
        <div
          className={`bg-white p-4 pt-8 ${
            switchReading ? "hidden lg:block" : ""
          }`}
        >
          <div className="mb-6">
            <div className="bg-[#FA812F] text-white p-3 rounded-md flex justify-between items-center">
              <div className="font-medium">
                Questions {passages[selectedPassage - 1].startQuestion} -{" "}
                {passages[selectedPassage - 1].endQuestion}
              </div>
              <div className="text-sm">
                Write your answers in boxes on your answer sheet.
              </div>
            </div>

            <div className="relative bg-gray-100 p-4 flex justify-center my-4 z-0">
              <div className="relative w-full h-64">
                <div className="absolute text-center bg-white border border-gray-300 rounded-md p-1 text-xs left-[10%] top-[10%]">
                  {selectedPassage === 1
                    ? "The Persian Qanat Method"
                    : selectedPassage === 2
                    ? "Agricultural Development"
                    : "Industrial Revolution"}
                </div>
                <div className="absolute text-center bg-white border border-gray-300 rounded-md p-1 text-xs right-[10%] top-[10%]">
                  2
                </div>
                <div className="absolute text-center bg-white border border-gray-300 rounded-md p-1 text-xs left-[40%] bottom-[40%]">
                  3
                </div>
                <div className="absolute text-center bg-white border border-gray-300 rounded-md p-1 text-xs right-[30%] bottom-[30%]">
                  4
                </div>
                <div className="absolute text-center bg-white border border-gray-300 rounded-md p-1 text-xs left-[20%] bottom-[10%]">
                  5
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {currentQuestions.map((question) => (
                <div key={question.id} className="flex items-center">
                  <div className="mr-2 w-6 h-6 bg-[#FA812F] text-white rounded-full flex items-center justify-center text-xs">
                    {question.id}
                  </div>
                  <div className="flex-1">{question.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white pt-0 pb-2 lg:pt-2 lg:pb-2 z-10">
        <div className="hidden lg:flex flex-wrap justify-center mt-0 gap-1 max-w-3xl mx-auto">
          {passageQuestionNumbers.map((questionNum) => {
            const isAnswered = getAnsweredStatus(questionNum);
            return (
              <button
                key={questionNum}
                className={`w-8 h-8 rounded-md flex items-center justify-center text-xs ${
                  isAnswered
                    ? "bg-[#FA812F] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {questionNum}
              </button>
            );
          })}
        </div>

        {/* NAVIGATE DESKTOP */}
        <div className="hidden lg:flex justify-between mt-2 text-sm border-t border-gray-200 pt-2">
          <div
            className={`${
              selectedPassage === 1 ? "" : "border border-[#FA812F]"
            } w-36 flex justify-center items-center rounded-lg my-2 py-2 px-4 bg-white ml-4 cursor-pointer`}
            onClick={handlePreviousPassage}
          >
            <div
              className={`text-[#FA812F] font-medium text-md justify-center items-center ${
                selectedPassage === 1 ? "hidden" : "flex"
              }`}
            >
              <ChevronLeft color="#FA812F" /> Passage {selectedPassage - 1}
            </div>
          </div>

          <div className="flex justify-center items-center">
            {passages.map((passage) => (
              <PassageProgressBar
                key={passage.id}
                passageNumber={passage.id}
                currentQuestion={passage.answeredQuestions}
                totalQuestions={passage.endQuestion - passage.startQuestion + 1}
                choosenPassage={selectedPassage === passage.id}
                onClick={() => handlePassageSelect(passage.id)}
              />
            ))}
          </div>
          <div
            className={`w-36 flex justify-center items-center ${
              selectedPassage === 3 ? "hidden" : "border border-[#FA812F]"
            } rounded-lg my-2 py-2 px-4 bg-white mr-4 cursor-pointer`}
            onClick={handleNextPassage}
          >
            <div
              className={`text-[#FA812F] font-medium text-md justify-center items-center ${
                selectedPassage === 3 ? "hidden" : "flex"
              }`}
            >
              Passage {selectedPassage + 1} <ChevronRight color="#FA812F" />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Link
            href="/reading-test/view-result"
            className={`w-36 flex justify-center items-center ${
              selectedPassage === 3 ? "border border-[#FA812F]" : "hidden"
            } rounded-lg my-2 py-2 px-4 mr-4 bg-[#FA812F] text-white cursor-pointer`}
          >
            <div
              className={`font-medium text-md justify-center items-center ${
                selectedPassage === 3 ? "flex" : "hidden"
              }`}
            >
              Nộp bài
            </div>
          </Link>
        </div>

        {/* NAVIGATE MOBILE */}
        <div className="lg:hidden flex justify-center items-center py-0 pt-2 border-t border-gray-200">
          <div className="flex justify-center text-sm">
            {passages.map((passage) => (
              <PassageProgressBarMobile
                key={passage.id}
                passageNumber={passage.id}
                currentQuestion={passage.answeredQuestions}
                totalQuestions={passage.endQuestion - passage.startQuestion + 1}
                choosenPassage={passage.id === selectedPassage}
                onClick={() => handlePassageSelect(passage.id)}
              />
            ))}
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex flex-col justify-center -translate-y-[2px]">
            <div className="w-full flex justify-center">
              <div
                className={`w-11 h-11 border-2 border-gray-300 rounded-full bg-white cursor-pointer flex items-center justify-center`}
                onClick={() => setIsPopupOpen(true)}
              >
                <Grid2x2Check color="#6B7280" size={17} />
              </div>
            </div>
            <div
              className={`text-gray-500 text-center font-bold text-[9px] mt-0.5`}
            >
              Reviews & Submit
            </div>
          </div>
        </div>

        {/* POPUP MENU QUESTIONS */}
        <AnimatePresence>
          {isPopupOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-0 top-0 left-0 right-0 bg-black z-20"
              />
              <PopupMenu isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
            </>
          )}
        </AnimatePresence>
      </div>
      {/* Toggle Button (Mobile Only) */}
      <div className="lg:hidden absolute bg-[#FA812F] rounded-full bottom-[13%] right-[5%] z-30">
        <div className="p-3.5" onClick={() => setSwitchReading(!switchReading)}>
          {switchReading ? (
            <Grid2x2Check color="white" />
          ) : (
            <FileText color="white" />
          )}
        </div>
      </div>
    </div>
  );
}
