import { RootState } from "@/stores/slice/rootstate";
import { useDispatch, useSelector } from "react-redux";
import { IThreadPost } from "../../layouts/ThreadCard";
import { apiAxios } from "@/library/api";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { GET_THREADS, SET_THREAD } from "@/stores/rootReducer";

export function threadCard() {
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  const submitHandle = async (e : FormEvent) => {
   
    e.preventDefault()
    handlePost()
  }

  async function getThreads() {
    const response = await apiAxios.get(`/thread?limit=5`);
    dispatch(GET_THREADS(response.data));
  }
  const handleDelete = async (id: number | undefined) => {
    try {
      await apiAxios.delete(`/api/threads/${id}`);
      // Perform any necessary cleanup or UI updates after successful deletion
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error(error);
    }
  };

  async function handlePost() {
    try {
      const formData = new FormData();
      formData.append("content", form.content as string);
      formData.append("image", form.image as File);
      const response = await apiAxios.post("/thread", formData);
      dispatch(SET_THREAD(response.data));
      console.log("Thread added successfully!", response);
      getThreads();
    } catch (err) {
      console.log("error post", err);
    }
  }

  useEffect(() => {
    getThreads();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return {
    handleChange,
    handlePost,
    submitHandle,
    fileInputRef,
    handleButtonClick,
    handleDelete,
    threads,
  };
}
