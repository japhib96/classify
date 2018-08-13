
import React, { Component } from 'react'
import axios from 'axios';
import { Grid, Menu, Segment, Icon, Header, Container, Input } from 'semantic-ui-react'
import CardGroups from '../projectComponent';
import { Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Headercomp from '../Headercomponent';
import Divider from '../divider';
import Modal from '../teacher/CreateLectureModal';
import Loading from '../Loader';

library.add(faCheckSquare, faCoffee, faGraduationCap)


export default class Classroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      lectures: null,
      title: ''
    }
  }

  componentDidMount() {
    console.log(this.props.classId)
    this.getLectures();
  }

  async getLectures() {
    let lectures;
    let title;
    // const self = this;
    await axios.post('/class/lectures', {
      classId: this.props.classId
    })
    .then((resp) => {
      lectures = resp.data.lectures;
      title = resp.data.title;
    });
    console.log(lectures)
    this.setState({ lectures, title, loading: false })
  }



  render() {
    if (this.props.lecture) { return <Redirect to='/user' />}
    if (this.state.loading) { return <Loading /> }

    return (

      <div>
        <Headercomp title={` Welcome to class ${this.state.title}`} />
          <div className="user grid">
            <div className="left col">
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Lectures</h2>
                </Container>
              </div>
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="question" size="3x" /> <h2>View Top Questions of {this.state.title} </h2>
                </Container>
              </div>
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> {this.state.title} Statistics</h2>
                </Container>
              </div>
            </div>
            <div className="right col wrapper">
              <header className="toolbar dashboard">
                <div className="right part">
                  <div><Modal/></div>
                  <div><h2>Join a Lecture</h2></div>
                </div>
                <div>
                  <Input icon='search' placeholder='Search for a Lecture...' />
                </div>
              </header>
              <div className="content dashboard">
                {
                  this.state.lectures.map((lecture) => {
                    return (
                      <Grid.Column  width={12} floated="right" className="style">
                        <Grid  columns={1} className="head comp" >
                          <Grid.Row  stretched verticalAlign="top">
                            <Grid.Column className="dashboard card style" width={4}>
                              <CardGroups title={lecture.lectureTitle} setLecture={this.props.setLecture} lectureId={lecture._id} />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    )
                  })
                }
              </div>
          </div>
        </div>
      </div>




    //   <div>
    //   <Headercomp title={this.state.title}
    //   description={'This is the class homepage. You can view past lectures or join live ones'}/>
    //   <div style={{height: '86.2%'}}>
    //     <Grid columns={2} doubling stretched className="style" >
    //         <Grid.Column className="style" stretched width={4} floated='left' >
    //           <Container>
    //             <Grid columns={1} centered  textAlign="center" verticalAlign="middle">
    //               <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
    //                 <Container textAlign="center" className="user dashboard menu">
    //                   <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
    //                 </Container>
    //               </Grid.Row>
    //               <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
    //                 <Container textAlign="center" className="user dashboard menu">
    //                   <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
    //                 </Container>
    //               </Grid.Row>
    //               <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
    //                 <Container textAlign="center" className="user dashboard menu">
    //                   <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
    //                 </Container>
    //               </Grid.Row>
    //             </Grid>
    //           </Container>
    //         </Grid.Column>
    //         <Grid.Column stretched width={12} floated="right" color="blue" className="style">
    //           <Container>
    //             <Grid>
    //             {
    //               this.state.lectures.map((lecture) => {
    //                 return (
    //                   <Grid.Column className="dashboard style" width={4}>
    //                     <CardGroups title={lecture.lectureTitle} setLecture={this.props.setLecture} lectureId={lecture._id} />
    //                   </Grid.Column>
    //                 )
    //               })
    //             }
    //             </Grid>
    //           </Container>
    //         </Grid.Column>
    //     </Grid>
    //   </div>
    // </div>
    )
  }
}
