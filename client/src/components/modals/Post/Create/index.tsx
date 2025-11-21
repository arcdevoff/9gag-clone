import { CreatePostFormValues } from "@/@types/post";
import { PostService } from "@/api/services/post.service";
import { UploadService } from "@/api/services/upload.service";
import getApiMessage from "@/api/utils/getApiMessage";
import FileInput from "@/components/ui/FileInput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import TagInput from "@/components/ui/TagInput";
import { setMessage, setModal } from "@/redux/reducers/ui/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PostCreateModal = () => {
  const [formData, setFormData] = useState<CreatePostFormValues>({});
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const { isOpen } = useAppSelector((state) => state.ui.modal.postCreateModal);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const topics = useAppSelector((state) => state.topic.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setFormDisabled(!formData.title);
  }, [formData.title]);

  const onRequestClose = () => {
    dispatch(
      setModal({ modal: "postCreateModal", modalState: { isOpen: false } })
    );
  };

  const handleSubmit = async () => {
    if (!formData.title) return;

    if (!file || !fileType) {
      return dispatch(
        setMessage({ text: "Please upload photo or video", status: false })
      );
    }

    try {
      setFormDisabled(true);
      const uploadData = await UploadService.upload({ file });
      const newFormData = { ...formData, [fileType]: uploadData.url };
      const post = await PostService.create(newFormData);

      setFormData({ title: "" });
      setPreviewUrl(null);
      setFile(null);

      onRequestClose();
      router.push(`/p/${post.id}`);
      dispatch(setMessage({ text: "Successfully", status: true }));
    } catch (error: any) {
      const msg = getApiMessage(error.response);

      if (msg) {
        dispatch(setMessage(msg));
      }
    } finally {
      setFormDisabled(false);
    }
  };

  return (
    <Modal title="Create Post" onRequestClose={onRequestClose} isOpen={isOpen}>
      <input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="placeholder:text-[17px] text-[17px] bg-stone-800 focus:outline-none px-5 h-14 w-full rounded-xl"
        type="text"
        placeholder="Title"
      />

      <Select
        labelClassName="ml-[9px] opacity-55"
        triggerClassName="w-full bg-stone-800 mt-4 p-3 h-14"
        optionClassName="py-1.5 pl-[9px] pr-4 hover:bg-stone-900"
        dropdownClassName="bg-stone-800 mt-3 p-2 border-1 border-white/5"
        selected={formData.topicId}
        onChange={(option) =>
          setFormData({ ...formData, topicId: option.value })
        }
        label="Select a topic"
        options={topics.map((topic) => ({
          value: topic.id,
          label: topic.name,
          image: topic.avatar,
        }))}
      />

      <FileInput
        setFileType={setFileType}
        setPreviewUrl={setPreviewUrl}
        onFileSelect={(file) => setFile(file)}
        maxSizeMb={50}
        removeFileButtonClassName="absolute bottom-[-57px] right-3 bg-stone-950 border-1 border-stone-800 p-1 rounded-full z-10"
        allowedMimeTypes={[
          "image/png",
          "image/jpeg",
          "video/mp4",
          "video/webm",
        ]}
      >
        {!previewUrl && (
          <div className="cursor-pointer bg-black border-1 border-stone-800 my-4 flex flex-col items-center text-center rounded-xl px-2 py-6">
            <ImageIcon width={40} height={40} />
            <div className="mt-3 font-bold">
              Choose a photo or video to upload
            </div>

            <div className="mt-4 text-stone-500 text-center">
              <div>Max Size: 50MB</div>
              <div>Allowed Types: png, jpg, mp4, webm</div>
            </div>
          </div>
        )}
      </FileInput>

      {previewUrl && (
        <div className="my-4">
          {fileType === "image" ? (
            <Image
              src={previewUrl}
              alt="Preview"
              width={500}
              height={300}
              className="w-full rounded-xl mx-auto"
            />
          ) : (
            fileType === "video" && (
              <video
                src={previewUrl}
                controls
                className="w-full rounded-xl mx-auto"
              />
            )
          )}
        </div>
      )}

      <TagInput
        removeButtonClassName="w-4 ml-1"
        tagClassName="mb-4 rounded-lg text-[15px] bg-stone-950 px-2 py-1 flex items-center"
        className="font-medium  flex items-center flex-wrap gap-2 cursor-pointer"
        inputClassName="placeholder:text-[17px] text-[17px] bg-stone-800 focus:outline-none px-5 h-14 w-full rounded-xl"
        tags={formData.tags}
        setTags={(tags) => setFormData({ ...formData, tags })}
      />

      <button
        onClick={() => handleSubmit()}
        disabled={formDisabled}
        className={`bg-blue-500 w-full h-11.5 rounded-xl mt-9 text-lg font-bold ${
          formDisabled && "opacity-50 cursor-not-allowed!"
        }`}
      >
        Post
      </button>
    </Modal>
  );
};

export default PostCreateModal;
