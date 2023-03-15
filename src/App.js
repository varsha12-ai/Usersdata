import React, { useState, useEffect } from "react";
import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getAvatarUrl = (username) => {
    return `https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy`;
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} md={4} key={user.id}>
              <Paper style={{ padding: 20 }}>
                <img
                  src={getAvatarUrl(user.username)}
                  alt={`Avatar for ${user.name}`}
                  style={{ width: "100%", marginBottom: 10 }}
                />
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="subtitle1">{user.email}</Typography>
                <Typography variant="subtitle1">{user.phone}</Typography>
                <Typography variant="subtitle1">{user.website}</Typography>
                <Typography variant="subtitle1">
                  {user.address.street}, {user.address.suite}
                </Typography>
                <Typography variant="subtitle1">
                  {user.address.city}, {user.address.zipcode}
                </Typography>
                <Typography variant="subtitle1">{user.company.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default App;