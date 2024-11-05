// src/app/main/blog/index.js
import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

const mockPosts = [
  {
    id: 1,
    user: "Jane Doe",
    avatar: "/user1.jpg",
    date: "October 29, 2024",
    goal: "Completed a 5K run in 30 minutes",
    comments: 3,
    likes: 15,
  },
  {
    id: 2,
    user: "John Smith",
    avatar: "/user2.jpg",
    date: "October 28, 2024",
    goal: "Lost 5 pounds in 2 weeks",
    comments: 5,
    likes: 20,
  },
];

const BlogPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Friends' Achievements
      </Typography>
      <Grid container spacing={3}>
        {mockPosts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar alt={post.user} src={post.avatar} />
                  </Grid>
                  <Grid item style={{ marginLeft: "10px" }}>
                    <Typography variant="h6">{post.user}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.date}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {post.goal}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" startIcon={<FavoriteIcon />}>
                  {post.likes} Likes
                </Button>
                <Button size="small" color="primary" startIcon={<CommentIcon />}>
                  {post.comments} Comments
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogPage;
