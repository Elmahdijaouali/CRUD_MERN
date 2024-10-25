# CRUD MERN 
![image my mini project](client/public/images/image.png)
# RESTful API Structure

# GET Requests

## Fetch All Posts
Endpoint: GET /api/post
Description: Retrieves all posts from the database.

## Fetch a Single Post by ID
Endpoint: GET /api/post/:id
Description: Retrieves a specific post using its ID.

## Search Posts by Title
Endpoint: GET /api/post/search/:title
Description: Searches for posts matching the title provided in the URL.

# POST Requests

## Create a New Post
Endpoint: POST /api/post/add
Description: Adds a new post to the database using the data sent in the request body.

# DELETE Requests

## Delete a Post by ID
Endpoint: DELETE /api/post/:id
Description: Deletes a specific post using its ID.

# PUT Requests

## Update a Post by ID
Endpoint: PUT /api/post/edit/:id
Description: Updates a specific post using its ID and the data sent in the request body.
