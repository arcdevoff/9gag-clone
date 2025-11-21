"use client";
import { X } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface TagInputProps {
  tags?: string[];
  setTags: (tags: string[]) => void;
  className?: string;
  inputClassName?: string;
  tagClassName?: string;
  removeButtonClassName?: string;
}

export default function TagInput({
  tags = [],
  setTags,
  className,
  inputClassName,
  tagClassName,
  removeButtonClassName,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (
      input.trim() &&
      /^[a-zA-Z0-9_-]+$/.test(input) &&
      !tags.includes(input.trim())
    ) {
      setTags([...tags, input.trim().toLocaleLowerCase()]);
    }
    setInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !input && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div>
      <div className={className}>
        {tags.map((tag, index) => (
          <div className={tagClassName} key={index}>
            {tag}
            <button
              className={removeButtonClassName}
              onClick={() => removeTag(tag)}
            >
              <X width="100%" />
            </button>
          </div>
        ))}
      </div>

      <input
        className={inputClassName}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter..."
      />
    </div>
  );
}
