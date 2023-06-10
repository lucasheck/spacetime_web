import { NewMemoryForm } from "@/components/NewMemoryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { EComponents, getDictionary } from "@/lib/language";

export default function NewMemory() {
  let language = "en";

  const langCookie = cookies().has("lang");
  if (langCookie) {
    language = cookies().get("lang")?.value ?? "en";
  }

  const { link } = getDictionary(language, EComponents.NewMemory);

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        {link}
      </Link>

      <NewMemoryForm language={language} />
    </div>
  );
}
