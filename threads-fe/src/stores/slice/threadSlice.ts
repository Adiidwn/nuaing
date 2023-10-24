import { ThreadCard } from "@/layouts/ThreadCard";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialThreadState: { threads: ThreadCard[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (state, action) => {
      state.threads = action.payload;
    },
    SET_THREAD: (state, action: PayloadAction<{ threads: ThreadCard[] }>) => {
      state.threads = action.payload.threads;
      console.log("====================================");
      console.log("state.threads", state.threads);
      console.log("====================================");
    },
    // SET_THREAD_LIKE: (
    //   state,
    //   action: { payload: { id: number; isLiked: boolean } }
    // ) => {
    //   const { id, isLiked } = action.payload;

    //   state.threads = state.threads.map((thread) => {
    //     if (thread.id === id) {
    //       return {
    //         ...thread,
    //         likes: isLiked
    //           ? thread.likes - 1
    //           : thread.likes + 1,
    //         is_liked: !isLiked,
    //       };
    //     }
    //     return thread;
    // });
    // },
  },
});
