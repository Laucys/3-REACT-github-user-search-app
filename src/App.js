import React, { useState, useEffect } from 'react';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import './App.css';

function App() {

  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://api.github.com/users/example")
    .then(res => res.json())
    .then(data => {
      setData(data)
      console.log(data)
    })
  }, []);

  const setData = ({ 
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    bio,
  }) => {
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setBio(bio);
  };

  const handleInput = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${userInput}`)
    .then (res => res.json())
    .then (data => {
      if (data.message) {
        setError(data.message)
      } else {
        setData(data);
        setError(null)
      }
    })
  }

  return (
    <div>
      <div className="navbar">
        Github User Search
      </div>
      <div className="search">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Github user'
              name='github user'
              onChange={handleInput}
            />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      { error ? (<h1> {error} </h1>): (<div className="card">
      <Card>
        <Image
        src={avatar}
        wrapped
        ui={false}
        />
          <Card.Content>
            <Card.Header>{userName}</Card.Header>
            <Card.Description>
              {bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {following} Following
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              {repos} Repos
            </a>
          </Card.Content>
      </Card>
    </div>)}
      
    </div>
  );
}

export default App;
