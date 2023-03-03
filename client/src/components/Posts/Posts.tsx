import Post from "./Post/Post";
import "./posts.scss";

interface Post {
  id: number;
  name: string;
  userId: number;
  profilePic: string;
  desc: string;
  media: string;
}

const Posts = (): JSX.Element => {
  // Temporary
  const posts: Post[] = [
    {
      id: 1,
      name: "User Name1",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      media:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600", // `media` includes videos or photos
    },
    {
      id: 2,
      name: "User Name2",
      userId: 2,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      media:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600", // `media` includes videos or photos
    },
    {
      id: 3,
      name: "User Name3",
      userId: 3,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      media:
        "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600", // `media` includes videos or photos
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post.id} /> // Or using `<div className="post">...</div>`, but not effective
      ))}
    </div>
  );
};

export default Posts;
