"use client";
import { setMessage } from "@/redux/reducers/ui/slice";
import { useAppDispatch } from "@/redux/store";
import { X } from "lucide-react";
import { useRef } from "react";

interface FileInputProps {
  allowedMimeTypes: string[];
  maxSizeMb: number;
  removeFileButtonClassName?: string;
  children: React.ReactNode;
  setFileType: (fileType: "image" | "video" | null) => void;
  setPreviewUrl: (url: string | null) => void;
  onFileSelect: (file: File | null) => void;
}

const FileInput = ({
  onFileSelect,
  allowedMimeTypes,
  children,
  setPreviewUrl,
  maxSizeMb,
  setFileType,
  removeFileButtonClassName,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!allowedMimeTypes.includes(file.type)) {
      dispatch(setMessage({ text: "Unsupported file type", status: false }));
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      dispatch(
        setMessage({
          text: `File is too large (max ${maxSizeMb}MB)`,
          status: false,
        })
      );
      return;
    }

    onFileSelect(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFileType(file.type.startsWith("image") ? "image" : "video");
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setFileType(null);
    onFileSelect(null);
    inputRef.current!.value = "";
  };

  return (
    <div className="relative">
      <div className="inline" onClick={handleClick}>
        {children}
      </div>

      {inputRef?.current?.value && (
        <button
          onClick={handleRemoveFile}
          className={removeFileButtonClassName}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={allowedMimeTypes.join(",")}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default FileInput;
