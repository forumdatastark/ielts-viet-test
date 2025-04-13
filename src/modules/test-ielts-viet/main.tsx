// pages/ielts-test.tsx
import { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/utils/images";
import PassageProgressBar from "./components/processing-bar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function WritingTestClient() {
  const [timeLeft, setTimeLeft] = useState("57:25");
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [selectedPassage, setSelectedPassage] = useState(1);
  const [wordCount, setWordCount] = useState(0);

  const passages = [
    { id: 1, startQuestion: 1, endQuestion: 1, answeredQuestions: 1 },
    { id: 2, startQuestion: 1, endQuestion: 1, answeredQuestions: 0 },
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

  const currentPassage = passages[selectedPassage - 1];

  // Sample IELTS reading passage data
  const passage1 = {
    id: 1,
    title: "Writing Task 1",
    content: [
      "The Romans, who once controlled areas of Europe, North Africa and Asia Minor, adopted the construction techniques of other civilizations to build tunnels in their territories",
    ],
  };

  const passage2 = {
    id: 2,
    title: "Writing Task 2",
    content: [
      "The Romans, who once controlled areas of Europe, North Africa and Asia Minor, adopted the construction techniques of other civilizations to build tunnels in their territories",
    ],
  };

  const countWords = (input: string) => {
    // Trim the input to remove leading/trailing whitespace
    const trimmedText = input.trim();

    // If empty or only whitespace, return 0
    if (!trimmedText) return 0;

    // Split by one or more whitespace characters and filter out empty strings
    const words = trimmedText.split(/\s+/).filter((word) => word.length > 0);
    return words.length;
  };

  // Handle textarea change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setWordCount(countWords(newText));
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center w-[10%] py-3">
          <Image
            src={IMAGES.LOGO}
            alt="DOL DINH LUC"
            width={1000}
            height={1000}
            className="w-full h-full"
          />
        </div>
        <div className="text-center">
          <div className="font-semibold">IELTS Writing Test</div>
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
          <Link href="/" className="ml-4">
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
      <div className="grid grid-cols-2 h-[calc(100vh-64px)]">
        {/* Reading passage */}
        {selectedPassage === 1 && (
          <div className="p-4 overflow-y-auto border-r border-gray-200 pt-[95px] pb-[30px]">
            <div>
              <h1 className="text-xl font-bold mb-4">{passage1.title}</h1>
              {passage1.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <Image
                src="https://edmicro.edu.vn/wp-content/uploads/2023/11/ielts-writing-task-1-bar-chart-vi-du.png"
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {selectedPassage === 2 && (
          <div className="p-4 overflow-y-auto border-r border-gray-200 pt-[95px] pb-[30px]">
            <div>
              <h1 className="text-xl font-bold mb-4">{passage2.title}</h1>
              {passage2.content.map((paragraph, index) => (
                <p key={index} className="mb-4 text-sm">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <Image
                src="https://edmicro.edu.vn/wp-content/uploads/2023/11/ielts-writing-task-1-bar-chart-vi-du.png"
                alt=""
                width={1000}
                height={1000}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="w-full bg-white p-4 pt-[95px] pb-0">
          <div className="text-xl font-bold mb-4">Bài làm</div>
          <div className="w-full h-full">
            <textarea
              id="title"
              value={text}
              onChange={handleTextChange}
              placeholder="Nhập bài viết của bạn"
              className="w-full h-3/4 p-2 border rounded"
            ></textarea>
            <div className="text-right">{wordCount}/1000</div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2">
        <div className="flex justify-between mt-2 text-sm border-t border-gray-200 pt-2">
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
              selectedPassage === 2 ? "hidden" : "border border-[#FA812F]"
            } rounded-lg my-2 py-2 px-4 bg-white mr-4 cursor-pointer`}
            onClick={handleNextPassage}
          >
            <div
              className={`text-[#FA812F] font-medium text-md justify-center items-center ${
                selectedPassage === 2 ? "hidden" : "flex"
              }`}
            >
              Passage {selectedPassage + 1} <ChevronRight color="#FA812F" />
            </div>
          </div>

          {/* SUBMIT BUTTON  */}
          <div
            className={`w-36 flex justify-center items-center ${
              selectedPassage === 2 ? "border border-[#FA812F]" : "hidden"
            } rounded-lg my-2 py-2 px-4 mr-4 bg-[#FA812F] text-white cursor-pointer`}
          >
            <div
              className={`font-medium text-md justify-center items-center ${
                selectedPassage === 2 ? "flex" : "hidden"
              }`}
            >
              Nộp bài
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
