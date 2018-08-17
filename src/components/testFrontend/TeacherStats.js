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
      loading: false
    };
  }

  componentDidMount(){
    this.getFeedBack()
    this.setState({loading: true})
  }

async getFeedBack(){
    await axios.post('/getFeedback/teacher', {
      lectureId : this.props.lecture.id
    })
    .then((resp) => {
      console.log(resp)
      this.setState({ averageReaction: resp.data.averageReaction, topQuestions: resp.data.topQuestions, numberOfQuestions: resp.data.numberOfQuestions, loading: false  })
    }).catch((e)=>{
      alert(e)
    });
  }

render (){
  console.log('lecture', this.props.lecture)
  if (this.state.loading) { return <Loading message={'Creating Feedback...'}/> }
  return(

    <Container text textAlign='justified' style={{height: 500, padding: 50, backgroundColor: 'white'}}>
      <h1 align='center'>Feedback</h1>
      <h4 align='left'>Overall student understanding: {this.state.averageReaction}</h4>

      <List>
        <List.Item icon='thumbs up' content='Understood perfectly'/>
        <List.Item icon='thumbs up' content='Understood well'/>
        <List.Item icon='thumbs down' content='Did not understand'/>
        <List.Item icon='blind' content='Completely Lost'/>
      </List>


      <h4 align='left'>Slides With Most Questions:</h4>
      <List >
        {this.state.slidesWithMostQuestions.map( (slideNum) =>{
          return (<List.Item>Slide {slideNum}</List.Item>)
        })}
      </List>

      <h4 align='left'>Top Questions:</h4>
      <List>
        {this.state.topQuestions.map( (question, index) =>{
          return (<List.Item>{question.author}: {question.message}</List.Item>)
        })}
      </List>

      <div role='list' >
        <div role='listitem' >
          Student Commentsasdflakjsdflkj
        </div>
      </div>
    </Container>
  )
}
}
