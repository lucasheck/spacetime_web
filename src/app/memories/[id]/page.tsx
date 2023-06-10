"use client";
import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import EditMemoryForm from "@/components/EditMemoryForm";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { useSearchParams } from "next/navigation";

interface Memory {
  id: string;
  coverUrl: string;
  content: string;
  createdAt: string;
  dateEvent: string;
  isPublic: boolean;
}

export default function Details() {
  const token = Cookie.get("token");
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const dateTime = searchParams.get("dateTime");
  const isAuthenticated = token;

  const [memory, setMemory] = useState<Memory>();

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const loadMemory = async () => {
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) setMemory(response.data);
  };

  useEffect(() => {
    loadMemory();
  }, [dateTime]);

  if (memory !== undefined) return <EditMemoryForm dados={memory} />;
}
