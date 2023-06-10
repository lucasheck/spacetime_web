"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { FormEvent } from "react";
import { api } from "@/lib/api";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { EComponents, ILanguageProps, getDictionary } from "@/lib/language";

export function NewMemoryForm({ language }: ILanguageProps) {
  const router = useRouter();
  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dateEvent = formData.get("dateEvent") + "T12:00:00.000Z";
    const content = formData.get("content");
    const isPublic = formData.get("isPublic");

    if (content === "" || dateEvent === "T12:00:00.000Z") return;

    const fileToUpload = formData.get("coverUrl");

    let coverUrl = "";

    if (fileToUpload instanceof File) {
      if (fileToUpload.name === "") return;

      const uploadFormData = new FormData();
      uploadFormData.set("file", fileToUpload);

      const uploadResponse = await api.post("/upload", uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    } else return;

    const token = Cookie.get("token");

    await api.post(
      "/memories",
      {
        coverUrl,
        content: content,
        isPublic: isPublic,
        dateEvent: dateEvent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/");
  }

  const {
    mediaPickerInput,
    checkBoxInput,
    dateInput,
    buttonSave,
    placeHolder,
  } = getDictionary(language, EComponents.NewMemoryForm);

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          {mediaPickerInput}
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
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
          />
        </label>
      </div>
      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder={placeHolder}
      ></textarea>
      <button
        type="submit"
        className="self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
      >
        {buttonSave}
      </button>
    </form>
  );
}
