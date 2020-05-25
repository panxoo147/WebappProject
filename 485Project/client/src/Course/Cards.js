import React from 'react';
import {Card} from 'react-bootstrap';
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router';
import history from '../history'
import { withStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { Rating } from '@material-ui/lab/';



const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #f06292 30%, #64b5f6 90%)',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);


class Cards extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {redirect: false,
      course:{ID:this.props.course.CourseID,
              name:this.props.course.Coursename,
              Rank:this.props.course.Rank}
    }
  }
  handleClick(e){
   
    this.setState({redirect:true});
    
  }
  onclickRemove(event){
    console.log(this.state.course.ID+" "+this.state.course.name)
    fetch('/deleteCourse',{
      method: 'DELETE',
      body: JSON.stringify({'CourseID':this.state.course.ID}),
      headers: new Headers({'Content-Type': 'application/json'})
    }).then(window.location.reload(false))
  }
  render(){
  if (this.state.redirect) {
   history.push('/CourseDetail')
      return <Redirect to={{
        pathname: '/CourseDetail',
        state : {ID:this.state.course.ID,name:this.state.course.name,rank:this.state.course.Rank}
      }}
    />;
    }
  return (
            <Card style={{boxShadow:"2px 2px 8px #424242",borderRadius:30}}>
                <Card.Body>
                  <IconButton onClick={this.onclickRemove.bind(this)} style={{border:"1px solid #ad1457",outline:"none",position:"absolute",right:4,top:4}} edge="start" color="inherit" aria-label="menu">
                    <DeleteForeverIcon style={{color:"#ad1457"}}/>
                  </IconButton>
                    <Card.Title>{this.props.course.CourseID}</Card.Title>
                    <Card.Text>
                        {this.props.course.Coursename}
                    </Card.Text>

                    <Rating readOnly name="size-large"size="large"
                    defaultValue={this.state.course.Rank} /><br/>
                    <StyledButton onClick={this.handleClick.bind(this)}>GO</StyledButton>
                </Card.Body>
            </Card>
  );}
}
export default Cards;
