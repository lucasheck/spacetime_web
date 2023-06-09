"use client";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import en from "dayjs/locale/en";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { EComponents, getDictionary } from "@/lib/language";

interface MemoryProps {
  dados: {
    id: string;
    coverUrl: string;
    content: string;
    createdAt: string;
    dateEvent: string;
    isPublic: boolean;
  };
}

export default function EditMemoryForm({ dados }: MemoryProps) {
  const router = useRouter();

  const language = Cookie.get("lang") ?? "en";
  dayjs.locale(language === "ptBR" ? ptBR : en);

  const { id, coverUrl, content, dateEvent, isPublic } = dados;
  const dateInputFormatted = dayjs(dateEvent).format("YYYY-MM-DD");

  const {
    checkBoxInput,
    dateInput,
    placeHolder,
    buttonGoBack,
    buttonEdit,
    buttonSave,
  } = getDictionary(language, EComponents.EditMemoryForm);

  const toogleButtons = () => {
    document.getElementById("btnEditar")?.classList.toggle("hidden");
    document.getElementById("btnCancelar")?.classList.toggle("hidden");
    document.getElementById("btnSalvar")?.classList.toggle("hidden");
  };

  const handleEditMemory = () => {
    toogleButtons();
    const inputs = document.querySelectorAll(":disabled");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  };

  const handleUpdateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    /* id, content, coverUrl, isPublic, dateEvent */

    const token = Cookie.get("token");

    const dateEvent = formData.get("dateEvent") + "T12:00:00.000Z";

    const response = await api.put(
      `/memories/${id}`,
      {
        content: formData.get("content"),
        coverUrl: coverUrl,
        isPublic: formData.get("isPublic"),
        dateEvent: dateEvent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/");
  };

  return (
    <div className="flex flex-1 flex-col gap-5 p-8">
      <div key={id} className="flex flex-col space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {language === "ptBR"
            ? dayjs(dateEvent).format("DD[ de ]MMMM[ de ]YYYY")
            : dayjs(dateEvent).format("MMMM DD, YYYY")}
        </time>
        <Image
          src={coverUrl}
          height={280}
          width={592}
          alt="Imagem da Lembrança"
          className="aspect-video w-full rounded-lg object-cover"
        />
      </div>

      <form
        onSubmit={handleUpdateMemory}
        className="flex h-full flex-1 flex-col gap-3"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="isPublic"
            className="flex items-center gap-1.5 text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              defaultChecked={isPublic}
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
              disabled
            />
            {checkBoxInput}
          </label>

          <label htmlFor="dateEvent">
            {dateInput}
            <input
              className="ml-2 rounded-lg border-dashed bg-transparent "
              type="date"
              name="dateEvent"
              id="dateEvent"
              defaultValue={dateInputFormatted}
              disabled
            />
          </label>
        </div>

        <textarea
          name="content"
          id="txtContent"
          spellCheck={false}
          className="h-40 w-full resize-none rounded border-0 bg-transparent p-0 text-justify text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0 lg:h-full"
          placeholder={placeHolder}
          defaultValue={content}
          disabled
        ></textarea>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2">
          <Link href="/">
            <button
              id="btnVoltar"
              className="self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
            >
              {buttonGoBack}
            </button>
          </Link>
          <button
            id="btnEditar"
            type="button"
            className="self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
            onClick={handleEditMemory}
          >
            {buttonEdit}
          </button>
          <button
            id="btnSalvar"
            type="submit"
            className="hidden self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
          >
            {buttonSave}
          </button>
        </div>
      </form>
    </div>
  );
}
