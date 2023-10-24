import { apiAxios } from "@/library/api";
import { useDispatch } from "react-redux";

export function likePost() {
  const dispatch = useDispatch();
  // const threads = useSelector((state: RootState) => state.threads);

  async function handlePostLike(id: number, isLiked: boolean) {
    console.log("id hook like:",id)
    console.log(" hook isLike:",isLiked)

    try {
      if (!isLiked) {
        await apiAxios.post("/like", { threadId: id });
        // console.log("berhasil menambahkan like", response.data);
      } else {
        await apiAxios.delete(`/like/${id}`);
        // console.log("berhasil delete like", response.data);
      }
      // dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
    } catch (err) {
      console.log("Failed updating like!", err);
    }
  }

  return {
    // threads,
    handlePostLike,
  };
}