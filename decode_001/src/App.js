import { useEffect, useState } from 'react';
import moment from 'moment'

// Main Styles
import './App.scss';

// Components
import NotificationCenter from './components/NotificationCenter';

// User avatars
import avatar_MarkWebber from './assets/images/avatar-mark-webber.webp'
import avatar_AngelaGray from './assets/images/avatar-angela-gray.webp'
import avatar_JacobThompson from './assets/images/avatar-jacob-thompson.webp'
import avatar_RizkyHasanuddin from './assets/images/avatar-rizky-hasanuddin.webp'
import avatar_KimberlySmith from './assets/images/avatar-kimberly-smith.webp'
import avatar_NathanPeterson from './assets/images/avatar-nathan-peterson.webp'
import avatar_AnnaKim from './assets/images/avatar-anna-kim.webp'

// Post Images
import post_picture_placeholder from './assets/images/image-chess.webp'

function App() {

  // Set users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Mark Webber",
      photo: avatar_MarkWebber
    },
    {
      id: 2,
      name: "Angela Gray",
      photo: avatar_AngelaGray
    },
    {
      id: 3,
      name: "Jacob Thompson",
      photo: avatar_JacobThompson
    },
    {
      id: 4,
      name: "Rizky Hasanuddin",
      photo: avatar_RizkyHasanuddin
    },
    {
      id: 5,
      name: "Kimberly Smith",
      photo: avatar_KimberlySmith
    },
    {
      id: 6,
      name: "Nathan Peterson",
      photo: avatar_NathanPeterson
    },
    {
      id: 7,
      name: "Anna Kim",
      photo: avatar_AnnaKim
    },
  ])

  // Set posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My first tournament today!"
    },
    {
      id: 2,
      title: "5 end-game strategies to increase your win rate"
    },
    {
      id: 3,
      title: "Placeholder",
      picture: post_picture_placeholder
    },
  ])

  // Set notification types
  const [states, setStates] = useState({
    reactedPost: {
      id: 1,
      name: "reactedPost",
      message: "reacted to your recent post"
    },
    followed: {
      id: 2,
      name: "followed",
      message: "followed you"
    },
    joinedGroup: {
      id: 3,
      name: "joinedGroup",
      message: "has joined your group"
    },
    leftGroup: {
      id: 4,
      name: "leftGroup",
      message: "left the group"
    },
    sentMessage: {
      id: 5,
      name: "sentMessage",
      message: "sent you a private message"
    },
    commentedPicture: {
      id: 6,
      name: "commentedPicture",
      message: "commented on your picture"
    }
  })

  // Set notifications using variables set before
  const [notifications, setNotifications] = useState([
    {
      user: users[0],
      state: states.reactedPost,
      post: posts[0],
      read: false,
      timestamp: moment().subtract(1, 'minutes')
    },
    {
      user: users[1],
      state: states.followed,
      read: false,
      timestamp: moment().subtract(5, 'minutes')
    },
    {
      user: users[2],
      state: states.joinedGroup,
      group_name: "Chess Club",
      read: false,
      timestamp: moment().subtract(1, 'days')
    },
    {
      user: users[3],
      state: states.sentMessage,
      message_received: "Hello, thanks for setting up the Chess Club. I’ve been a member for a few weeks now and I’m already having lots of fun and improving my game.",
      read: true,
      timestamp: moment().subtract(5, 'days')
    },
    {
      user: users[4],
      state: states.commentedPicture,
      post: posts[2],
      read: true,
      timestamp: moment().subtract(1, 'weeks')
    },
    {
      user: users[5],
      state: states.reactedPost,
      post: posts[1],
      read: true,
      timestamp: moment().subtract(2, 'weeks')
    },
    {
      user: users[6],
      state: states.leftGroup,
      group_name: "Chess Club",
      read: true,
      timestamp: moment().subtract(2, 'weeks')
    },
  ])

  return (
    <div className="App">
      <NotificationCenter notifications={notifications} setNotifications={setNotifications} />
    </div>
  );
}

export default App;
