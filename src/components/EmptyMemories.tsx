import { IEmptyMemories } from "@/lib/language";
import Link from "next/link";

export function EmptyMemories(emptyMem: IEmptyMemories) {
  const { paragraph, link } = emptyMem;
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        {paragraph}
        <Link href="/memories/new" className="underline hover:text-gray-50">
          {link}
        </Link>
        {link && "!"}
      </p>
    </div>
  );
}
