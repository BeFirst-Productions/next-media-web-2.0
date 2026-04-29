import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      {/* Top Heading */}
      <h2 className="mb-12 text-2xl font-bold md:text-3xl">
        <span className="text-[#00AEFF]">Oops!</span> Page Not Found!
        <span className="ml-2 inline-block text-[#00AEFF] opacity-80">▽</span>
      </h2>

      {/* Hero 404 Number */}
      <h1 className="text-[120px] font-black leading-none tracking-tighter text-[#00AEFF] md:text-[200px]">
        404
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400 md:text-base">
        We're sorry but we can't seem to find the page you requested. 
        This might be because you have typed the web address incorrectly.
      </p>

      {/* Back to Home Button */}
  <div className="mt-28 flex flex-col items-center">
  <div className="flex flex-col items-center justify-center relative">

    <Link href="/">
      <button className="group relative flex items-center rounded-full bg-black p-2 pr-12 overflow-hidden transition-all duration-500 cursor-pointer">

        {/* Expanding white layer */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white transition-all duration-500 ease-in-out group-hover:w-full group-hover:h-full group-hover:left-0 z-0"></div>

        {/* Icon circle */}
        <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-black"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>

        {/* Text */}
        <span className="relative z-10 ml-4 text-xl font-medium tracking-tight text-white transition-all duration-500 group-hover:text-black">
          Back to Home
        </span>

      </button>
    </Link>

  </div>
</div>
    </div>
  );
}