import React, { Component } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []

    }
    this.fetchPost = this.fetchPost.bind(this)
  };


  componentWillMount() {
    this.fetchPost()
  }

  fetchPost() {
    console.log('Fetching...')

    fetch('api/post/<int:pk>/')
      .then(response => response.json())
      .then(data =>
        this.setState({
          data
        })
      )
  }


  render() {
    var post = this.state.data
    var self = this
    return (
      <div>
        <AppBar />
          <Container className='container'>
          <Grid container spacing={3}>
            {post.map(function (post, index) {
              return (
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="250"
                        image={post.image}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {post.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button color="primary">
                        Приобрести
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </div>
    )

  }
}