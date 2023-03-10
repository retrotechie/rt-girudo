import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

import "./stories.scss";

interface Story {
  id: number;
  name: string;
  media: string;
}

const Stories = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  const stories: Story[] = [
    // Temporary
    {
      id: 1,
      name: "Story 1",
      media:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      name: "Story 2",
      media:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 3,
      name: "Story 3",
      media:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 4,
      name: "Story 4",
      media:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 5,
      name: "Story 5",
      media:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
        <img src={currentUser?.profilePic} alt="" />
        <span>{currentUser?.name}</span>
        <button>+</button>
      </div>

      {
        // Use `map` to iterate over `stories` array
        stories.map((story) => (
          <div className="story" key={story.id}>
            <img src={story.media} alt="" />
            <span>{story.name}</span>
          </div>
        ))
      }
    </div>
  );
};

export default Stories;
