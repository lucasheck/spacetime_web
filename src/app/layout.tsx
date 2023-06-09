import { Profile } from "@/components/Profile";
import "./globals.css";
import { Bai_Jamjuree as BaiJamjuree, Roboto_Flex } from "next/font/google";
import { cookies, headers } from "next/headers";
import { ReactNode } from "react";
import { SignIn } from "@/components/SignIn";
import { Hero } from "@/components/Hero";
import { Copyright } from "@/components/Copyright";
import Image from "next/image";
import brazilFlag from "../assets/br-flag.svg";
import usaFlag from "../assets/us-flag.svg";

const roboto2 = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto2" });
const baiJamJuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "NLW Spacetime",
  description:
    "Uma cápsula do tempo construída com React, Next.js, TypeScript e TailwindCSS",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has("token");

  let language = "en";
  const header = headers();
  const param = header.get("x-invoke-query");
  if (param) {
    const paramDecode = JSON.parse(decodeURIComponent(param));
    if (paramDecode.lang === "ptBR") language = "ptBR";
  }

  return (
    <html lang="en">
      <body
        className={`${roboto2.variable} ${baiJamJuree.variable} min-w-[512px] bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover p-16 px-28 py-16">
            {/* Blur */}
            <div className="translate-y absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"></div>
            {/* Stripes */}
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>

            {/* Header */}
            <div className="flex w-full flex-row justify-between">
              {isAuthenticated ? (
                <Profile language={language} />
              ) : (
                <SignIn language={language} />
              )}
              <div className="flex gap-2">
                <a href="/?lang=ptBR">
                  <Image
                    src={brazilFlag}
                    alt="Brazil Flag"
                    className="h-6 w-7 cursor-pointer rounded-md"
                  />
                </a>
                <a href="/?lang=en">
                  <Image
                    src={usaFlag}
                    alt="USA Flag"
                    className="h-6 w-7 cursor-pointer rounded-md"
                  />
                </a>
              </div>
            </div>

            <Hero language={language} />

            <Copyright language={language} />
          </div>
          {/* RIGHT */}
          <div className="flex flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover lg:max-h-screen">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
