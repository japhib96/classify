import React from 'react'
import { Button, Header, Segment, Container, Label, Grid, Message } from 'semantic-ui-react'
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

  sendAnswer(questionId, answer) {
    this.socket.emit('ANSWER_QUESTION', {
      questionId: questionId,
      answer: answer,
      lectureId: this.props.lecture,
      user: this.props.user._id
    })
  }

  renderColor = (question, index) => {
    let check;
    if (question.answers.hasOwnProperty(this.props.user._id)) {
      check = question.answers[this.props.user._id]
    }
    if(this.state.questions[0] && check === index) {
      return 'blue'
    } else {
      return ''
    }
  }

  render() {


    return (
      <div className="stats section">
        <Header className="commentblock" as='h1' textAlign="center">
          Quiz
          <Header.Subheader content='Respond to teacher´s questions' />
        </Header>

        {this.state.questions[0] ?

          <div className="question wrapper">
            {this.state.questions.map((question, index) => {
              if (index === this.state.questions.length - 1) { // shows only the most recent question
                return (
                  <div>
                    <header className="quiz header">
                      <Message size="massive">
                        {question.question}
                      </Message>
                    </header>
                    <div className="quiz container">
                      {question.options.map((option, index) => {
                        const num = index + 1;
                        return (
                          <div className="question container">
                            <Button className="quiz" color={this.renderColor(question, index)} onClick={() => this.sendAnswer(question._id, index)}>
                              <Message size="large">{num + '. ' + option}</Message>
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              })}
            </div>

            :

            <div className="question wrapper inactive">
              <div>
                <header className="quiz header inactive">
                  <Message className="not active header" size="massive">
                    Currently no Questions available
                  </Message>
                </header>
                <div className="quiz container inactive">
                  <Message className="inactive" size="massive"> Stay tuned for Questions from your Teacher </Message>
                </div>
              </div>
            </div>
        }
        </div>
      )
    }
  }


  export default Questions


  {/* <Grid stretched verticalAlign="bottom">
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
  <Segment as={Button} circular size="small" textAlign="center" className={this.renderColor(question, index)} onClick={() => this.sendAnswer(question._id, index)}>
  <Label size="massive">{num + '. ' + option}</Label>
</Segment>
</Grid.Row>
)
})}
</Grid.Row>
)}
})}
</Grid>
</Grid> */}
