import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
  dateEvent: string;
  isPublic: boolean;
}

export default async function Details() {
  const headersList = headers();

  const cookie = headersList.get("cookie");
  const idRequest = headersList.get("x-invoke-path")?.replace("/memories/", "");

  const isAuthenticated = cookie?.includes("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookie!.split("=")[1];

  const response = await api.get(`/memories/${idRequest}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { id, coverUrl, content, dateEvent, isPublic }: Memory = response.data;

  if (!id) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex flex-1 flex-col gap-4 p-16">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar à timeline
        </Link>
      </div>

      <div key={id} className="flex flex-col space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(dateEvent).format("DD[ de ]MMMM[ de ]YYYY")}
        </time>
        <Image
          src={coverUrl}
          height={280}
          width={592}
          alt="Imagem da Lembrança"
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="leading-relax text-lg text-gray-100 ">{content}</p>
      </div>
    </div>
  );
}
