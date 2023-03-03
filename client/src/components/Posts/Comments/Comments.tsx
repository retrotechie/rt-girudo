import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import "./comments.scss";

interface Comment {
  id: number;
  desc: string;
  name: string;
  userId: number;
  profilePicture: string;
}

const Comments = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  // Temporary
  const comments: Comment[] = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "User Name1",
      userId: 1,
      profilePicture:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "User Name2",
      userId: 2,
      profilePicture:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ];

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser?.profilePic} alt="" />
        <input type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>

      {comments.map((comment: Comment) => (
        <div className="comment">
          <img src={comment.profilePicture} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
