"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import FullIeltsTestContent from "./main";

export default function FullIeltsTestClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Header />
      <div className="w-full mb-20">
        <FullIeltsTestContent />
      </div>
      <Footer />
    </div>
  );
}
