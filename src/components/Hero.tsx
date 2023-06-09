import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";
import { getDictionary, ILanguageProps } from "@/lib/language";

export function Hero({ language }: ILanguageProps) {
  const { title, abstract, button } = getDictionary(language, "Hero");
  return (
    <div className="max-w-[420px] space-y-5">
      <Image src={logo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-2xl font-bold leading-tight text-gray-50 lg:text-5xl">
          {title}
        </h1>
        <p className="text-base leading-relaxed lg:text-lg">{abstract}</p>
      </div>
      <Link
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        href="/memories/new"
      >
        {button}
      </Link>
    </div>
  );
}
