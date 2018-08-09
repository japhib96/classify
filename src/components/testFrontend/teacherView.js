import React from 'react';
import StatisticSection from '../ClassStatistics'
import PDFViewer from './PDFViewer'
import EmotionBar from '../EmotionBar'




class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {

    return (
      <div>
        <PDFViewer lecture={this.props.lecture}/>
        <StatisticSection user={this.props.user} lecture={this.props.lecture} />
        <EmotionBar user={this.props.user} lecture={this.props.lecture}/>

      </div>
    );
  }
}

export default TeacherView;
