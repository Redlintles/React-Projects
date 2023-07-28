import { useDispatch } from "react-redux"
import { likePhoto } from "../slices/photoSlice";
import { resetComponentMessage } from "../utils/utilities";

export const useHandleLike = (photo) => {

  const dispatch = useDispatch();
  function handleLike() {
    dispatch(likePhoto(photo._id));
    resetComponentMessage(dispatch);
  }

  return handleLike;
}