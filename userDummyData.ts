import Beach from "@/public/assets/Beach.avif";
import Coffee from "@/public/assets/Coffe.jpg";

import Marco from "@/public/icons/profile_marco.png";
import Martin from "@/public/icons/profile_martin.png";
import Alison from "@/public/icons/profile_alison.png";
import Avatar from "@/public/icons/avatar_icon.png";

export const posts = [
  {
    id: 1,
    title: "My sunny day!",
    image: Beach,
    likes: 23,
    profilePic: Marco,
    comments: [
      {
        author: "Jim",
        comment: "Very Good Picture!",
        profilePic: Avatar,
      },
      {
        author: "Tommy",
        comment: "Sun is shining!",
        profilePic: Avatar,
      },
    ],
  },
  {
    id: 2,
    title: "Coffee",
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid rem, eaque nam impedit commodi eum optio qui laborum facilis aliquam, tenetur harum incidunt corrupti exercitationem ducimus autem consequatur velit? Nesciunt!",
    likes: 57,
    profilePic: Martin,
    comments: [
      {
        author: "Marco",
        comment: "Very Good theory",
        profilePic: Marco,
      },
      {
        author: "Tommy",
        comment: "I don't think so",
        profilePic: Avatar,
      },
    ],
  },
  {
    id: 3,
    title: "Coffee is life",
    image: Coffee,
    likes: 15,
    profilePic: Alison,
    comments: [
      {
        author: "Martin",
        comment: "Very Good Picture!",
        profilePic: Martin,
      },
      {
        author: "Tommy",
        comment: "Sun is shining!",
        profilePic: Avatar,
      },
    ],
  },
];
