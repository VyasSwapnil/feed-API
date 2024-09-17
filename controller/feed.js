exports.getPosts = (req, res, next) => {
  res.status(200).json({
    _id: "1",
    posts: [
      {
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/cat.jpg",
        creator: { name: "Swapnil" },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //Create post in db
  res.status(201).json({
    message: "Post created successfully.",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      creator: { name: "Swapnil Vyas" },
      createdAt: new Date(),
    },
  });
};
