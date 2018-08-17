import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container, Label, Menu, Tab, Button, Form, Grid, Header,
    Image, Message, List, Segment, Icon
} from 'semantic-ui-react'

import axios from 'axios';

export default class StudentStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      averageReaction: 0,
      topQuestions: [],
      confusedSlides: [],
      loading: false
    };
  }

  componentDidMount(){
    this.getFeedBack()
    this.setState({loading: true})
  }

async getFeedBack(){
    await axios.post('/getFeedback/student', {
      lectureId : this.props.lecture.id,
      userId: this.props.user._id
    })
    .then((resp) => {
      console.log(resp)
      this.setState({ averageReaction: resp.data.averageReaction, topQuestions: resp.data.topQuestions, confusedSlides: resp.data.confusedSlides, loading: false  })
    }).catch((e)=>{
      alert(e)
    });
  }

render (){
  if (this.state.loading) { return <Loading message={'Creating Feedback...'}/> }
  return(

    <Container text textAlign='justified' style={{height: 500, padding: 50, backgroundColor: 'white'}}>
      <h1 align='center'>Feedback</h1>

      <h4 align='left'>Overall Understanding:  {this.state.averageReaction}</h4>

      <List ordered>
        <List.Item icon='thumbs up' content='Q1'/>
        <List.Item icon='thumbs up' content='Q2'/>
        <List.Item icon='thumbs down' content='Q3'/>
      </List>

      <h4 align='left'>Slides you were confused on:</h4>
      <List ordered>
        {this.state.confusedSlides.map( (slideNum, index) =>{
          return (<List.Item>Slide {slideNum}</List.Item>)
        })}
      </List>

      <h4 align='left'>Your questions:</h4>
      <List ordered>
        {this.state.topQuestions.map( (question, index) =>{
          return (<List.Item>{question.author}: {question.message}</List.Item>)
        })}
      </List>

    </Container>
  )
}
}
