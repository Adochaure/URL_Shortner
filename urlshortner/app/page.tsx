import Image from "next/image";
import Hero from "./components/Hero";
import Inputs from "./components/Inputs";
import Boxs from "./components/Boxs";
import Toggle from "./components/Toggle";
export default function Home() {
  return (
    <div className="relative doto-id flex flex-col flex-1 items-center justify-center border border-white border-dashed mt-10 mb-10 font-sans bg-transparent ">
      <main
        className="
          absolute
          h-screen
          left-4
          right-4
          sm:left-6
          sm:right-6
          md:left-1/2
          md:right-auto
          md:-translate-x-1/2
          md:w-full
          max-w-3xl
          flex
          flex-1
          flex-col
          items-center
          justify-center
          py-32
          px-6
          sm:px-10
          md:px-16
          text-3xl
          bg-transparent
          border-l
          border-r
          border-white
          border-dashed
          overflow-y-hidden
        "
      >
       <Hero />
       <Toggle />
       <Inputs />
      <Boxs />
      </main>
    </div>
  );
}