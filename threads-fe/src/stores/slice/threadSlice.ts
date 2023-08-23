import { ThreadCard } from "@/layouts/ThreadCard";
import { createSlice } from "@reduxjs/toolkit";

const initialThreadState: { threads: ThreadCard[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (state, action) => {
      state.threads = action.payload;
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
    //         likesCount: isLiked
    //           ? thread.likesCount - 1
    //           : thread.likesCount + 1,
    //         isLiked: !isLiked,
    //       };
    //     }
    //     return thread;
    //   });
    // },
  },
});