import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2d2b29] dark:bg-slate-800">
        <div className="flex flex-col p-10 bg-[#2d2b29] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox!
            <br />
            <br />
            Everything you and your business need to work efficiently, all in
            one place
          </h1>
          <p className="pb-10">
            Collaborate seamlessly and deliver work faster from anywhere with
            Dropbox. Securely store your content, edit PDFs, share videos, sign
            documents and track file engagement—without leaving Dropbox.
          </p>
          <Link
            href="/dashboard"
            className="flex items-center bg-blue-500 w-fit p-5 cursor-pointer"
          >
            Try For Free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="h-full p-10 bg-[#2d2b29] dark:bg-slate-800">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your Browser Does Not support the video tag
          </video>
        </div>
      </div>
      <p className="font-bold text-xl pt-2 text-center">Disclaimer</p>
      <p className="text-center font-light p-2">
        This site is a Dropbox clone for educational purposes only and is not
        affiliated with the official Dropbox service. Please do not use your
        official Dropbox credentials on this platform. This website complies
        with the provisions of the Copyright Act of 1976, recognizing and
        respecting intellectual property rights.
      </p>
    </main>
  );
}
