import { getUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export function Profile() {
  const { name, avatarUrl } = getUser();
  return (
    <div className="flex items-center gap-3 text-left transition-colors">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="userPhoto"
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[200px] text-sm leading-snug">
        <span className="block">Olá, {name}</span>
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Sair
        </a>
      </p>
    </div>
  );
}
