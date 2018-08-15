import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container, Label, Menu, Tab, Button, Form, Grid, Header,
    Image, Message, List, Segment, Icon
} from 'semantic-ui-react'

import axios from 'axios';

export default class TeacherStats extends React.Component {


render (){

  return(

    <Container text textAlign='justified' style={{height: 500, padding: 50, backgroundColor: 'white'}}>
      <h1 align='center'>Feedback</h1>
      <h4 align='left'>Overall student understanding:</h4>

      <List>
        <List.Item icon='thumbs up' content='Understood perfectly'/>
        <List.Item icon='thumbs up' content='Understood well'/>
        <List.Item icon='thumbs down' content='Did not understand'/>
        <List.Item icon='blind' content='Completely Lost'/>
      </List>


      <h4 align='left'>Most difficult slides:</h4>
      <List ordered>
        <List.Item content='Slide 1'/>
        <List.Item  content='Slide two'/>
        <List.Item  content='Slide three'/>
      </List>

      <h4 align='left'>Student Comments:</h4>

      <div role='list' class='ui celled list'>
        <div role='listitem' class='item'>
          Student Commentsasdflakjsdflkj
        </div>
      </div>
    </Container>
  )
}
}