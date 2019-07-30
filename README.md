# HobbyExchange
Skill Exchange A web application where users enter skills that they have and skills that they want to learn.  For example, if user 1 wants to learn guitar and is good at coding, they can be matched to user 2 who can teach guitar and wants to learn coding.    Each user will list several skills that they have and several skills that they want to learn.   Then when there is a match, the user will will be notified and will be able to contact their teacher/ student to meet up and exchange skills


## API Rout
```
GET   /api/hobbies  -- list all hobbies (id, name)
GET   /api/learnFrom/:userId   --  (userId) can learn from [list of users and skills]
GET   /api/teachTo/:userId     --  (userId) can teach [list of users] 

POST  /api/users               --  create a new user
POST  /api/:user/teach         --   Create a skill set for user (:user)
POST  /api/:user/learn         --   Create a skill set a user (:user) wants to learn
```