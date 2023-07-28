import styles from "./Photo.module.css";
import { upload } from "../../utils/config";


import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs';

import {useDispatch} from "react-redux";
import { useEffect, useRef } from 'react'
import { useParams, Link } from "react-router-dom";


import {deletePhoto} from "../../slices/photoSlice";
import { resetComponentMessage } from "../../utils/utilities";

const Photo = ({ photo, userId,editToggler, editData }) => {

  const dispatch = useDispatch();

  const { id } = useParams();
  const bgRef = useRef();

  useEffect(() => {
    if (bgRef && photo.image) {
      bgRef.current.style.backgroundImage = `url(${upload}/photos/${photo.image})`;

    }
  }, [bgRef])

  function handleDeletePhoto(id) {
    dispatch(deletePhoto(id));

    resetComponentMessage(dispatch)
  }

  return (
    <div className={styles.photo}>
      <div className={styles.photoBg} ref={bgRef}></div>

      {id === userId ? (
        <div className={styles.photoActions}>
          <Link to={`/photos/${photo._id}`}>
            <BsFillEyeFill />
          </Link>
          <BsPencilFill 
            onClick={()=> {editToggler(true); editData(photo)}}
          />
          <BsXLg 
            onClick={()=> {handleDeletePhoto(photo._id)}}
          />
        </div>
      ) : (
        <div>
          <Link className="btn" to={`/photos/${photo._id}`}>
            Ler
          </Link>
        </div>
      )}

    </div>
  )
}

export default Photo;


