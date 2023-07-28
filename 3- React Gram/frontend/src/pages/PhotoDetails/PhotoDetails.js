import styles from "./PhotoDetails.module.css";
import { upload } from "../../utils/config";

// Components
import Message from "../../components/Message/Message"
import FormFeedback from "../../components/FormFeedback/FormFeedback";
import { Link } from "react-router-dom";

// Hooks
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getPhotoById, commentPhoto } from "../../slices/photoSlice";
import { resetComponentMessage, setInputValue } from "../../utils/utilities";
import ShowPhoto from '../../components/ShowPhoto/ShowPhoto';
let x = true;


const PhotoDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const { photo, loading, message, error } = useSelector(store => store.photo);

  const [comment, setComment] = useState();

  useEffect(() => {
    dispatch(getPhotoById(id));
    resetComponentMessage(dispatch);
  }, [])

  if (loading) {
    return <p>Carregando...</p>
  }

  if(x) {
    dispatch(getPhotoById(id));
    resetComponentMessage(dispatch);
    x=false;

  }


  function handleCommentSubmit(e) {
    e.preventDefault()

    const data = {
      comment,
      id: photo._id
    }

    dispatch(commentPhoto(data));
    resetComponentMessage(dispatch);
  }



  return (
    <>
      {photo && (
        <>
          <div className={styles.photoDetails}>
            <ShowPhoto type="individual" photo={photo} />
            <div className={styles.messageContainer}>
              {error && <Message type="error" msg={error} />}
              {message && <Message type="success" msg={message} />}
            </div>
            <div className={styles.commentContainer}>
              {/* <h3>Comentários({photo.comments.length})</h3> */}
              <form onSubmit={handleCommentSubmit}>
                <label>
                  <span>Comente Aqui:</span>
                  <input
                    type="text"
                    placeholder="Digite Um Comentário"
                    value={comment}
                    onChange={setInputValue(setComment)}
                  />
                </label>
                <FormFeedback />
              </form>
              <div className="comments">
                {photo.comments && photo.comments.length > 0 && photo.comments.map((comment, i) => (
                  <div className={styles.comment} key={i}>
                    <div className={styles.commentAuthor}>
                      {comment.userImage && (
                        <img src={`${upload}/users/${comment.userImage}`} alt={comment.userName} />
                      )}
                      <Link to={`/users/${comment.userId}`}>
                        <p>{comment.userName}</p>
                      </Link>
                    </div>
                    <p className={styles.commentBody}>{comment.comment}</p>
                  </div>
                ))}
                {photo.comments.length === 0 && <p>Não Há comentários...</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PhotoDetails