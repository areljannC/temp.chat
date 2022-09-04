# [temp.chat](https://temp.chat)

💬 Temporary chatrooms for anonymous use powered by Next.js and WebSockets.

## ⭐ Features

* Completely anonymous chatrooms
* Real-time messages
* Unlimited users per chatroom
* No web trackers
* No message logging; users joining a chatroom can't scroll to view previous messages
* Toggleable dark and light themes
* Mobile and desktop responsive

## 👨‍💻 Tech Stack 

### 📱 Client

* TypeScript
* Next.js
* Chakra UI
* Heroku

### 🌐 Server

* TypeScript
* Node.js
* Express
* WebSockets
* Heroku

## ✅ Roadmap

* use Redis to store chatrooms
* shareable images, videos and links
* cache user's name and previous chatroom to session/local storage
* give user option to remove cached info from session/local storage
* auto-reconnecting sockets
* private & public chat rooms
* global chat room

## Authors

* **AJ Clemente** [areljannC](https://github.com/areljannC)

## Acknowledgments

I learned a lot about WebSockets with this project. I woke up one day with an itch to learn this technology and so I thought,
"Let's make something today."

Hats off to the thousands of tutorials on YouTube, Medium and everywhere else teaching me about [socket.io](https://socket.io/). I initially made it work with **socket.io** and committed it, then I came across an article saying that it was bloated and outdated. I ended up using [ws](https://github.com/websockets/ws) because it was the *fastest* and *most lightweight* implementation of WebSockets for Node.js.
