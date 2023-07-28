import { resetMessage } from "../slices/photoSlice"



export function setInputValue(setter) {
  return (e) => { setter(e.target.value) }
}
export function resetComponentMessage(dispatch) {
  setTimeout(()=>{
    dispatch(resetMessage());
  },2000)
}
