# HobbyExchange
Skill Exchange A web application where users enter skills that they have and skills that they want to learn.  For example, if user 1 wants to learn guitar and is good at coding, they can be matched to user 2 who can teach guitar and wants to learn coding.    Each user will list several skills that they have and several skills that they want to learn.   Then when there is a match, the user will will be notified and will be able to contact their teacher/ student to meet up and exchange skills


## API Routes

```
get /api/hobbies                  -- list all hobbies   

post /api/hobbies                -- create muliple hobbies

post /api/users                   -- Craete a new user, learn table, teach table and pubklish match 

get /api/users/:userid            -- get one user's information

post /api/users/:userid/skills    -- create a skill set (what he/.she can teach) for a specific user

post /api/users/:userid/needs     -- create a need set (what he/she wants to learn) for a specific use

get /api/users/:userid/teachto    -- match one user's needs to other users' skill sets. 
                                     Return a list of users and their skills can for a specific user(:userid)  

get /api/users/:userid/learnfrom  -- match one user's skill set to other users' needs. 
                                     Return a list of users he/she needs to teach



```

```
Reading books
        Blogging
        Dancing
       Singing
        Listening to music
        Playing musical instruments (piano, guitar etc.)
        Learning new languages
       Shopping
       Travelling
        Hiking
        Cycling
        Exercising
        Drawing
        Painting
        Collecting things
        Playing computer games
        Cooking
        Baking
        Gardening
        Doing crafts (handmade)
        Embroidering
        Sewing
        Knitting
        Playing board games
        Walking
       Writing stories
        Fishing
        Photography
        Skydiving
        Skating
        Skiing
        Roller skating
        Longboarding
        Surfing
```