import { ThreadCard } from "@/layouts/ThreadCard";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IReplyPost } from '../../interfaces/Reply';
import { useParams } from "react-router-dom";
import { apiAxios } from "@/library/api";

export function useThread() {

  const [replies, setReplies] = useState<ThreadCard[]>([]);

  const [thread, setThread] = useState<ThreadCard>();

  const { id } = useParams()
  const [form, setForm] = useState<IReplyPost>({
    content: "",
    threadId: Number(id),
  })

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

    const response =   await apiAxios.post("/reply",form)
      console.log("response post reply kirim data komentar", response.data)
      console.log("response post reply kirim data fom", form)
      getReplies()
    } catch (err) {
      console.log("reply error :",err)
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  async function getThreadBId() {
    try{
      const response = await apiAxios.get(`/thread/${id}`)
      setThread(response.data)
    } catch (err) {
      console.log("fail get thread :", err)
    }
  }

  async function getReplies() {
    try {
      const response = await apiAxios.get(`/reply?threadId=${id}`)
      setReplies(response.data)
      console.log("get replies hooks :",response.data)
    } catch (err) {
      console.log("failed get replies :", err)
    }
  }

  useEffect(() => {
    getReplies()
    getThreadBId()
  }, [])

  return {
    replies,
    thread,
    form,
    handleChange,
    handlePost,
  }
}