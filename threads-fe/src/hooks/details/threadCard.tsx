import { IThreadPost } from "@/layouts/ThreadCard";
import { apiAxios } from "@/library/api";
import { AUTH_LOGOUT, GET_THREADS } from "@/stores/rootReducer";
import { RootState } from "@/stores/slice/rootstate";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export function useThreads() {
  const threads = useSelector((state: RootState) => state.thread.threads);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: null,
  });

  async function getThreads() {
    const response = await apiAxios.get(`/thread/`);
    dispatch(GET_THREADS(response.data));
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", form.content as string);
    formData.append("image", form.image as File);
    console.log('====================================');
    console.log("form.image as:" , form.image as File);
    console.log("form.image :" , form.image );
    console.log('====================================');

    const response = await apiAxios.post("/thread/", formData);
    console.log("thread added successfully", response);
    getThreads()
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

  function handleLogout() {
    dispatch(AUTH_LOGOUT());
    navigate("/");
  }

  return { threads, getThreads, handleChange, handlePost, handleLogout };
}
