"use client";
import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import en from "dayjs/locale/en";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useSearchParams } from "next/navigation";
import { IChildren, getDictionary } from "@/lib/language";

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
  dateEvent: string;
}

export default function Home() {
  const [memories, setMemories] = useState<Memory[] | null>(null);
  const [dictionary, setDictionary] = useState<IChildren>();

  const token = Cookie.get("token");
  const isAuthenticated = token;

  let language = "en";

  const params = useSearchParams();
  const langParam = params.get("lang");
  if (langParam !== null) Cookie.set("lang", langParam);

  const langCookie = Cookie.get("lang");
  if (langCookie) language = langCookie;

  dayjs.locale(language === "ptBR" ? ptBr : en);

  useEffect(() => {
    const dict: IChildren = getDictionary(language);
    setDictionary(dict);
  }, []);

  const dateTime = new Date();

  if (!isAuthenticated) {
    return (
      <EmptyMemories
        paragraph={dictionary?.emptyMemories?.paragraph}
        link={dictionary?.emptyMemories?.link}
      />
    );
  }

  useEffect(() => {
    loadMemories();
  }, []);

  const loadMemories = async () => {
    const response = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) setMemories(response.data);
  };

  if (memories === null || memories?.length === 0) {
    return (
      <EmptyMemories
        paragraph={dictionary?.emptyMemories?.paragraph}
        link={dictionary?.emptyMemories?.link}
      />
    );
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories &&
        memories.map((memory) => {
          return (
            <div key={memory.id} className="flex flex-col space-y-4">
              <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                {language === "ptBR"
                  ? dayjs(memory.dateEvent).format("DD[ de ]MMMM[ de ]YYYY")
                  : dayjs(memory.dateEvent).format("MMMM DD, YYYY")}
              </time>
              <Image
                src={memory.coverUrl}
                height={280}
                width={592}
                alt="Imagem da Lembrança"
                className="aspect-video w-full rounded-lg object-cover"
              />
              <p className="leading-relax text-lg text-gray-100 ">
                {memory.content}
              </p>
              <Link
                href={{
                  pathname: `/memories/${memory.id}`,
                  query: { id: `${memory.id}`, dateTime: dateTime.getTime() },
                }}
                className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
              >
                {dictionary?.memories?.link}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          );
        })}
    </div>
  );
}
