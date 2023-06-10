"use client";

import { ChangeEvent, Fragment, useState } from "react";

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null);
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files || !files?.length) {
      setPreview(null);
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);
    setPreview(previewURL);
  }

  return (
    <Fragment>
      <input
        type="file"
        id="media"
        name="coverUrl"
        className="invisible h-0 w-0"
        accept="image/*"
        onChange={onFileSelected}
      />
      {preview && (
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </Fragment>
  );
}
