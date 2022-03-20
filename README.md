# Listen

### What is it?
Listen is a web app built using React, Node, Express, and MongoDB. It's a place where people can come together to discuss mental health related issues.

### What are the features?
It consists of three main features: chat, direct messages, and discussion board.

### How does it work?
The authentication process is built using the Passport.js library. When the user creates an account or signs in, they are issued a JWT and refresh token; the JWT can be used to authorize subsequent API calls. When the JWT expires, the refresh token is used to issue a new JWT and to update itself.

A socket connection, built using Socket.io, is established once the user is authenticated. It allows users to receive real-time notifications; send, receive, and delete friend requests and direct messages; and use the chat feature.

The chat feature works by separting the roles between potential conversationalists. A user who opts to "listen" will match with another who opts to "talk". In addition to this separation of roles, the talker may fill out a questionnaire to target their ideal listener filtering out potential listeners based on the information available in their profiles.

The discussion board allows users to interact with the entire community. They can create, edit, delete, posts and comments, and vote how relatable they are.