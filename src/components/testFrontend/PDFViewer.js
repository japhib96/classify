import React from 'react';
import PDF from 'react-pdf-js';


class MyPdfViewer extends React.Component {
  state = {
    filePath: ''
  };

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }

  onChange(e) {
  this.setState({uploadFile: e.target.files[0]})
}

  sendFile(e){
    e.preventDefault()
        // console.log(req.user)
    var data = new FormData()
    data.append("uploadFile", this.state.uploadFile)
    fetch("/uploadSlide", {
      method:"POST",
      credentials:"same-origin",
      body: data
    })
    .then((res) => res.json() )
    .then((res) => {
      console.log(res)
      if(res.status === 'success'){
        console.log(res.id)
        // var filePath = res.event.pdf
        // var url = `url(../../slides/${filePath && filePath.filename})`
        var filePath = 'http://localhost:3001/slide/' + res.id


        this.setState({filePath})
      }
    })
    .catch(err => {
      console.log("Error: ", err)
    })
  }

  render() {

    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }

    return (
      <div>
      <form >
        <h1>File Upload</h1>
        <input
               type="file"
               onChange={(e) => this.onChange(e)}
             />
        <button type="submit" onClick={ (e)=>this.sendFile(e)}>Upload</button>
      </form>
      {this.state.filePath == '' ?
        <div>

        </div>
        :
        <div>
        <PDF
          file={this.state.filePath}
          onDocumentComplete={this.onDocumentComplete}
          page={this.state.page}
        />
        <h1>Failed</h1>
        </div>
      }

        {pagination}
      </div>
    )
  }
}

export default MyPdfViewer;
