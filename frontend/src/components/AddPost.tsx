import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import {
  PhotographIcon,
  DuplicateIcon,
  PlusIcon,
  XIcon,
  EmojiHappyIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import TextareaAutosize from "react-textarea-autosize";
import { Picker } from "emoji-mart";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { hideAddPostModal } from "../redux/slice/addPost";
import { PostFormIntf } from "../interfaces/home/posts";
import { postCreateService } from "../services/post";
import Spin from "./features/animation/Spin";

interface FileIntf {
  src: string;
  type: string;
  name: string;
}

const AddPost: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const intitialFormState = useMemo(() => {
    return {
      files: [],
      description: "",
      location: "",
      tags: [],
      users_tag: [],
    };
  }, []);

  const [form, setForm] = useState<PostFormIntf>(intitialFormState);

  const initialSelectedFileState = useMemo(() => {
    return {
      src: "",
      type: "",
      name: "",
    };
  }, []);

  const [selectedFile, setSelectedFile] = useState<FileIntf>(
    initialSelectedFileState
  );
  const [files, setFiles] = useState<FileIntf[]>([]);
  const [showAddFile, setShowAddFile] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(false);

  const handleClosePostCreate = () => {
    dispatch(hideAddPostModal());
    done && navigate(0);
  };

  const handleFileOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSelected: boolean,
    firstPhase: boolean
  ) => {
    const file = e.currentTarget.files?.item(0);
    if (file) {
      const formShallow = { ...form };
      formShallow.files.push(file);
      setForm(formShallow);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const filesShallow = [...files];
        filesShallow.push({
          src: e.target?.result as string,
          type: file.type,
          name: file.name,
        });
        setFiles(filesShallow);
        setSelected &&
          setSelectedFile({
            ...selectedFile,
            src: e.target?.result as string,
            type: file.type,
            name: file.name,
          });
      };
      fileReader.readAsDataURL(file);
      e.target.value = "";
      firstPhase && setCurrentPhase(2);
    }
  };

  const handleFileType = useCallback(
    (type: string) => {
      return selectedFile?.type.startsWith(type);
    },
    [selectedFile]
  );

  const handleGetSelectFile = () => {
    return handleFileType("image") ? (
      <img
        onClick={() => setShowAddFile(false)}
        src={selectedFile.src}
        className={`w-full h-full rounded-bl-xl ${
          currentPhase === 2 && "rounded-br-xl"
        } object-cover`}
        alt={selectedFile.name}
      />
    ) : handleFileType("video") ? (
      <video
        src={selectedFile.src}
        autoPlay
        className="w-full h-full object-cover"
      ></video>
    ) : (
      <></>
    );
  };

  const handleSetSelectedFile = (
    e: React.MouseEvent<HTMLElement>,
    file: FileIntf
  ) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const formShallow = { ...form };
    formShallow.files.splice(index, 1);
    setForm(formShallow);
    const filesShallow = [...files];
    filesShallow.splice(index, 1);
    setFiles(filesShallow);
    index === 0 && files.length > 0 && setSelectedFile(filesShallow[0]);
    filesShallow.length < 1 && setCurrentPhase(1);
  };

  const handleBackOnePhase = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    let currentPhaseNum = currentPhase;
    setCurrentPhase(--currentPhaseNum);
  };

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleTextareaOnBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const textareaKeywords = e.currentTarget.value.split(" ");
    const tags = textareaKeywords.filter((keyword) => keyword.startsWith("#"));
    const formTags: string[] = [];
    tags.forEach((tag) => {
      tag = tag.replace("#", "");
      if (tag !== "") {
        formTags.push(tag);
      }
    });
    setForm({ ...form, tags: formTags });
  };

  const handleEmojiSelect = (emoji: any) => {
    setForm({
      ...form,
      description: form.description + emoji.native,
    });
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: React.MouseEvent<HTMLSpanElement>) => {
    setSubmitLoading(true);
    try {
      const formData = new FormData();

      // I had to create a form data instance and adding the lists one by one.
      // This the only way that i could find (I think there is a better way)

      form.files.forEach((file) => {
        formData.append("files", file);
      });
      form.tags.forEach((tag) => {
        formData.append("tags", tag);
      });
      form.users_tag.forEach((user_tag) => {
        formData.append("users_tag", user_tag);
      });
      formData.append("description", form.description);
      formData.append("location", form.location);
      await postCreateService(auth.token, formData);
      setDone(true);
    } catch (e: any) {
      console.log(e.response.data);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowPicker(false);
    });
    return () => document.removeEventListener("click", () => {});
  }, []);

  useEffect(() => {
    if (currentPhase === 1) {
      if (files.length > 0) {
        setForm(intitialFormState);
        setFiles([]);
        setSelectedFile(initialSelectedFileState);
        setShowAddFile(false);
      }
    }
  }, [currentPhase, files, intitialFormState, initialSelectedFileState]);

  return (
    <div className="h-full w-full fixed inset-0 z-50 bg-zinc-900 bg-opacity-90 flex items-center justify-center">
      <XIcon
        onClick={handleClosePostCreate}
        className="absolute right-4 top-4"
        width={35}
        height={35}
        cursor="pointer"
        color="white"
      />
      <div className="bg-white rounded-xl w-auto h-[550px]">
        {done ? (
          <div className="h-full">
            <div className="text-center px-4 py-2 border-b">
              <span className="font-medium">Post shared</span>
            </div>
            <div className="h-[92.5%] w-[550px] flex flex-col items-center justify-center">
              <BadgeCheckIcon
                width={80}
                height={80}
                className="text-green-500"
              />
            </div>
          </div>
        ) : submitLoading ? (
          <div className="h-full">
            <div className="text-center px-4 py-2 border-b">
              <span className="font-medium">Post sharing</span>
            </div>
            <div className="h-[92.5%] w-[550px] flex flex-col items-center justify-center">
              <Spin className="text-blue-500" w="w-7" h="h-7" />
            </div>
          </div>
        ) : currentPhase === 1 ? (
          <div className="h-full">
            <div className="text-center px-4 py-2 border-b">
              <span className="font-medium">Create new post</span>
            </div>
            <div className="h-[92.5%] w-[550px] flex flex-col items-center justify-center">
              <div className="mb-2">
                <PhotographIcon width={70} height={70} />
              </div>
              <div className="mb-6">
                <span className="text-xl text-gray-600 font-thin">
                  Upload photos and videos here
                </span>
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="block relative bg-blue-500 rounded font-medium text-white px-2 py-1 text-sm cursor-pointer active:bg-blue-400 select-none"
                >
                  Select from computer
                  <input
                    onChange={(e) => handleFileOnChange(e, true, true)}
                    type="file"
                    id="file"
                    name="file"
                    className="hidden absolute inset-0"
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          currentPhase >= 2 && (
            <div className="h-full">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <ArrowLeftIcon
                  className="select-none"
                  cursor="pointer"
                  width={23}
                  height={23}
                  onClick={handleBackOnePhase}
                />
                {currentPhase === 2 ? (
                  <>
                    <span className="font-medium">Crop</span>
                    <span
                      className="cursor-pointer text-blue-500 active:text-blue-400 select-none"
                      onClick={() => setCurrentPhase(3)}
                    >
                      Next
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-medium">Create new post</span>
                    <span
                      className="cursor-pointer text-blue-500 active:text-blue-400 select-none"
                      onClick={handleOnSubmit}
                    >
                      Share
                    </span>
                  </>
                )}
              </div>
              <div className="h-[92.6%] flex">
                <div className="w-[550px] relative">
                  <>
                    {handleGetSelectFile()}
                    <span className="absolute transition rounded-full bottom-4 right-4 w-8 h-8 flex items-center justify-center bg-gray-900 opacity-80 hover:opacity-60 text-white cursor-pointer focus:bg-white focus:opacity-100 focus:text-gray-900 select-none">
                      <DuplicateIcon
                        onClick={() => setShowAddFile(!showAddFile)}
                        width={20}
                        height={20}
                      />
                    </span>
                    {showAddFile && (
                      <div className="absolute flex items-center p-2 w-full max-w-[93.7%] overflow-auto h-28 bg-gray-900 bg-opacity-70 rounded-lg right-4 bottom-16">
                        <Swiper
                          slidesPerView={3.5}
                          spaceBetween={12}
                          slidesPerGroup={1}
                          loop={false}
                          loopFillGroupWithBlank={true}
                          className="mySwiper w-[85%] h-full"
                        >
                          {files.map((file, i) => (
                            <SwiperSlide
                              key={i}
                              className="cursor-pointer h-full relative"
                            >
                              <img
                                onClick={(e) => handleSetSelectedFile(e, file)}
                                src={file.src}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                              <div
                                onClick={(e) => handleRemoveFile(e, i)}
                                className="absolute right-1 top-1 w-5 h-5 bg-gray-900 bg-opacity-90 transition rounded-full text-gray-200 flex items-center justify-center hover:bg-opacity-60"
                              >
                                <XIcon width={15} height={15} />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <div className="w-[15%] ml-4">
                          <label
                            className="rounded-full w-12 h-12 border cursor-pointer text-gray-100 flex items-center justify-center active:bg-gray-100"
                            htmlFor="file"
                          >
                            <PlusIcon
                              width={25}
                              height={25}
                              className="text-gray-400"
                            />
                            <input
                              onChange={(e) =>
                                handleFileOnChange(e, false, false)
                              }
                              type="file"
                              id="file"
                              name="file"
                              className="hidden absolute inset-0"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                </div>
                {currentPhase === 3 && (
                  <div className="w-[350px] py-4">
                    <div className="flex items-center mb-4 px-4">
                      <img
                        src={auth.user?.profile?.image}
                        alt={auth.user?.username}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="ml-2 font-medium">
                        {auth.user?.username}
                      </span>
                    </div>
                    <div className="border-b pb-2.5">
                      <div className="px-4">
                        <>
                          <TextareaAutosize
                            onBlur={handleTextareaOnBlur}
                            onChange={handleOnChange}
                            value={form.description}
                            name="description"
                            maxRows={7}
                            minRows={7}
                            placeholder="Write a caption..."
                            className="w-full outline-none resize-none mb-2"
                          />
                          <div
                            className="relative"
                            onClick={(e: React.MouseEvent) =>
                              e.stopPropagation()
                            }
                          >
                            <EmojiHappyIcon
                              width={25}
                              height={25}
                              cursor="pointer"
                              className="text-gray-400 mr-3"
                              onClick={handleShowPicker}
                            />
                            {showPicker && (
                              <Picker
                                color="#3B82F6"
                                style={{
                                  position: "absolute",
                                  bottom: 45,
                                  left: 0,
                                  zIndex: 2,
                                  boxShadow:
                                    "rgba(99, 99, 99, 0.2) 0 2px 8px 0",
                                }}
                                set="apple"
                                showPreview={false}
                                onSelect={handleEmojiSelect}
                              />
                            )}
                          </div>
                        </>
                      </div>
                    </div>
                    <div className="pb-2.5 border-b px-4 pt-2.5">
                      <input
                        type="text"
                        className="w-full outline-none"
                        placeholder="Add location"
                        name="location"
                        value={form.location}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AddPost;
