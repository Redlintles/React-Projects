import React from 'react'

import styles from "./LikeContainer.module.css";

import {BsHeart, BsHeartFill} from "react-icons/bs";
import { useHandleLike } from '../../hooks/useHandleLike';

const LikeContainer = ({photo, user,type}) => {

  const handleLike = useHandleLike(photo);
  
  return (
    <div className={
      type==="individual"
      ? styles.likeContainer
      : styles.homeLikeContainer
      
      }>
    {photo.likes && (
      <>
        {photo.likes.includes(user._id) ? (
          <BsHeartFill />
        ) : (
          <BsHeart onClick={()=> handleLike()}/>
        )
        }
        <p>{photo.likes.length} like(s)</p>

      </>
    )}

  </div>
  )
}

export default LikeContainer