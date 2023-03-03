import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import "./post.scss";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { useState } from "react";

// Declare `post` props is bc `Post` is using props passed down from its parent
// component (`<Post post={post} ... />`)
interface PostProps {
  post: {
    id: number;
    name: string;
    userId: number;
    profilePic: string;
    desc: string;
    media: string;
  };
}

const Post = ({ post }: PostProps): JSX.Element => {
  const [commentOpen, setCommentOpen] = useState(false);
  const liked = false;

  // TODO: Detect whether `media` is a video or a picture
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img src={post.media} alt="" />
        </div>

        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            12 Shares
          </div>
        </div>

        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
