import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import { headers } from "next/headers";
import EditMemoryForm from "@/components/EditMemoryForm";

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

  const memoryProps: Memory = response.data;

  if (!memoryProps.id) {
    return <EmptyMemories />;
  }

  return <EditMemoryForm dados={memoryProps} />;
}
