import React from 'react'
import { Button, Header, Segment, Container, Label, Grid } from 'semantic-ui-react'
import io from 'socket.io-client';
import { Emoji } from 'emoji-mart';



class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allReactions: [],
      questions: [],
    };

    var self = this;

    this.socket = io('localhost:3001');

    // this.socket.on("ALL_REACTIONS", function(reactions){
    //   self.setState({allReactions: reactions})
    // })

    this.socket.on('UPDATE_QUESTIONS', function(questions){
      console.log('hi')
      self.setState({ questions: questions })
    });

  }

  componentDidMount() {
    console.log(this.props.lecture)
    this.socket.emit('JOIN_ROOM', {
      message: '',
      class: this.props.lecture
    })

    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.lecture
    })

    this.socket.emit('TEACHER_QUESTION', {
      question: '',
      options: [],
      lectureId: this.props.lecture
    })
  }

  render() {
    console.log(this.state.questions)
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
        Review
        <Header.Subheader content='Check your understanding' />
      </Header>
      <Grid stretched verticalAlign="bottom">
        <Grid columns="equal" >
          {this.state.questions.map((question, index) => {
            if (index === this.state.questions.length - 1) { // shows only the most recent question
            return (
              <Grid.Row centered>
                <Header> {question.question}</Header>
                {question.options.map((option, index) => {
                  const num = index + 1;
                  return (
                    <Grid.Row>
                      <Segment as={Button} circular size="small" textAlign="center" className="emoji top">
                        <Label size="massive">{num + '. ' + option}</Label>
                      </Segment>
                    </Grid.Row>
                  )
                })}
              </Grid.Row>
            )}
          })}
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default Questions
