import React from 'react'
import { Header, Segment, Container, Label, Grid } from 'semantic-ui-react'
import io from 'socket.io-client';
import { Emoji } from 'emoji-mart';



class StatisticSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReactions: []
    };

    var self = this;

    this.socket = io('localhost:3001');

    this.socket.on("ALL_REACTIONS", function(reactions){
      self.setState({allReactions: reactions})
    })

  }

  componentDidMount() {
    this.socket.emit('JOIN_ROOM', {
      message: '',
      class: this.props.lecture
    })

    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.lecture
    })
  }

  render() {
    var thumbsUp=0;
    var okay=0;
    var thumbsDown=0;
    var confused =0;
    this.state.allReactions.map( (reactionObj, index) =>{

      if(reactionObj.reaction === -1){
        thumbsDown += 1
      }
      else if(reactionObj.reaction === 0){
        okay += 1
      }
      else if(reactionObj.reaction === +1){
        thumbsUp += 1
      }
      else{
        confused += 1
      }
    }
  )

      return (
        <div className="stats section">
          <Header as='h1' dividing textAlign="center">
            Stats Section
            <Header.Subheader content='Check out your stats!' />
            </Header>
            <Grid stretched verticalAlign="bottom">
              <Grid columns="equal" >
                <Grid.Row centered>
                  <Header> How your peers are feeling...</Header>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Emoji  emoji='thumbsup' set='apple' skin="6" size={36} />
                  </Grid.Column>
                  <Grid.Column  textAlign="center" verticalAlign="middle">
                    <Label size="massive">{thumbsUp}</Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Emoji  emoji='ok_hand' set='apple' skin="6" size={36} />
                  </Grid.Column>
                  <Grid.Column  textAlign="center" verticalAlign="middle">
                    <Label size="massive" >{okay}</Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Emoji  emoji='thumbsdown' set='apple' skin="6" size={36} />
                  </Grid.Column>
                  <Grid.Column  textAlign="center" verticalAlign="middle">
                    <Label size="massive">{thumbsDown}</Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Emoji  emoji='exploding_head' set='apple' skin="6" size={36} />
                  </Grid.Column>
                  <Grid.Column  textAlign="center" verticalAlign="middle">
                    <Label size="massive">{confused}</Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Grid>
        </div>
    );
  }
}


export default StatisticSection
