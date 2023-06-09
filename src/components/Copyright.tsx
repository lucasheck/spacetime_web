import { ILanguageProps, getDictionary } from "@/lib/language";

export function Copyright({ language }: ILanguageProps) {
  const { paragraph } = getDictionary(language, "Copyright");

  return (
    <div className="text-sm leading-relaxed text-gray-200">{paragraph}</div>
  );
}
