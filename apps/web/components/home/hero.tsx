import Image from "next/image";

const hero = () => {
  return (
    <main>
      <div className="flex flex-col flex-wrap items-center justify-center gap-6 p-8 md:flex-row">
        <div className="flex flex-col items-center gap-4">
          <h1 className="flex flex-col gap-2 text-4xl font-extrabold md:text-8xl">
            Easy AMA for
            <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
              your audience
            </span>
          </h1>

          <p>
            Just create a room, share the link with your audience and answer the
            top upvoted questions
          </p>

          <button
            className="relative z-30 mt-6 box-border flex cursor-pointer items-center justify-center self-start overflow-hidden rounded-md bg-gradient-to-r from-cyan-500 to-teal-500 px-8 py-3 font-bold text-white ring-1 ring-cyan-300 ring-offset-2 ring-offset-indigo-200 transition-all duration-300 hover:ring-offset-cyan-400 focus:outline-none md:mt-8"
            type="button"
          >
            <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-8 translate-x-1 rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0" />
            <span className="absolute left-0 top-0 -ml-12 -mt-1 h-8 w-20 -translate-x-1 -rotate-45 transform bg-white opacity-10 transition-all duration-300 ease-out group-hover:translate-x-0" />
            <span className="relative z-20 flex items-center text-sm">
              <svg
                className="relative mr-2 h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Sign Up
            </span>
          </button>
          <p className="self-start text-sm text-gray-400">
            No credit card required
          </p>
        </div>
        <Image alt="Landing" height={20} src="/appDemo.png" width={400} />
      </div>
    </main>
  );
};

export default hero;
