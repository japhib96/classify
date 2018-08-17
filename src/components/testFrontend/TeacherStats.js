import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container, Label, Menu, Tab, Button, Form, Grid, Header,
    Image, Message, List, Segment, Icon
} from 'semantic-ui-react'
import Loading from '../Loader';

import axios from 'axios';

export default class TeacherStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageReaction: 0,
      topQuestions: [],
      slidesWithMostQuestions: [],
      loading: false,
      reaction: '',
      content1: ''
    };
  }

  componentDidMount(){
    this.getFeedBack()
    this.setState({loading: true})
  }
 setReaction(){
   console.log(this.state.averageReaction)

  if(this.state.averageReaction===1){
    this.setState({ reaction: 'thumbs up', content1: 'Class understood lecture perfectly'})
  }
  else if(0<this.state.averageReaction && this.state.averageReaction<1){
    this.setState( {reaction: 'thumbs up', content1: 'Class understood lecture well'})
  }
  else if(0>this.state.averageReaction && this.state.averageReaction>-1){
    this.setState({ reaction: 'thubms down', content1: 'Class understood did not understand lecture well' })
  }
  else if(-1>this.state.averageReaction){
    this.setState({ reaction: 'blind',  content1: 'Class understood did not understand lecture at all'})
  }


}
async getFeedBack(){
    await axios.post('/getFeedback/teacher', {
      lectureId : this.props.lecture.id
    })
    .then((resp) => {
      console.log(resp)
      this.setState({ averageReaction: resp.data.averageReaction, topQuestions: resp.data.topQuestions, slidesWithMostQuestions: resp.data.slidesWithMostQuestions, loading: false  })
      this.setReaction()

    }).catch((e)=>{
      alert(e)
    });

  }

render (){
    console.log(this.state.reaction)
  console.log('lecture', this.props.lecture)
  if (this.state.loading) { return <Loading message={'Creating Feedback...'}/> }
  return(
    <Container text textAlign='justified' style={{borderRadius:'25px', height: 600, margin: '30px', padding: '50px', backgroundColor: '#98dafc'}}>

      <h1 align='center'>Statistics</h1>
      <List celled style={{borderRadius:'25px', padding:'30px', backgroundColor: 'white'}}>
        <List.Item style={{padding: '10px'}}>Overall student understanding: {this.state.averageReaction}</List.Item>

        <List.Item style={{padding: '10px'}}><Icon className='animated bounce delay-3s' name={this.state.reaction}/>{this.state.content1}</List.Item>




        <List.Item style={{padding: '10px'}}>
          <u><List.Header style={{textAlign: 'left', marginBottom: '5px'}}>Slides With Most Questions:</List.Header></u>
          {this.state.slidesWithMostQuestions.map( (slideNum) =>{
            return (<List.Item>Slide {slideNum}</List.Item>)
          })}
        </List.Item>

        <List.Item style={{padding: '10px'}}>
        <u><List.Header style={{textAlign: 'left', marginBottom: '5px'}}>Top Questions:</List.Header></u>
          {this.state.topQuestions.map( (question, index) =>{
            return (<List.Item>{question.author}: {question.message}</List.Item>)
          })}
        </List.Item>
        <Message
          attached='bottom'
          warning

          style={{
            fontSize: '15px',
            marginTop: '15px'
          }}
        >
        Average is calculated based off a range of numbers -2-1 allocated to each emoji
        </Message>
      </List>

      </Container>
  )
}
}
