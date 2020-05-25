import React from 'react';
import Page from '../coursePage'
import Skel from '@material-ui/lab/Skeleton'
import { Form,Button} from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';

import AddCommentIcon from '@material-ui/icons/AddComment';

class CourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { UserID:"guess"+(Math.floor(Math.random()*1000000000)),CourseID:this.props.location.state.ID,comment:'' }
        this.onChangeHandle = this.onChangeHandle.bind(this)
    }
    
    onChangeHandle(e){
        this.setState({comment:e.target.value})
    }
    onSubmit(e){

        e.preventDefault();
        
        fetch('/AddComment', {
            method: 'POST', 
            body: JSON.stringify({'id':this.props.location.state.ID,'userId':this.state.UserID,'comment':this.state.comment}), 
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        }).then(
        this.setState({comment:""})
        )
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    render() { 
        return (
   
            <div >
            <div style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #64b5f6 90%)',backgroundColor:"#90caf9",textAlign:"center",padding:5}}>
                    <h1 style={{marginTop:60}}>
                        {this.props.location.state.ID} :
                    </h1>
                    <h3>
                        {this.props.location.state.name}
                    </h3>
            </div>
                    <div>
                        <Page course={this.props.location.state.ID}/>
                    </div>

                    <div style={{marginBottom:50,marginLeft:200}}>
                       
                        <h1 style={{color:"#263238"}}>Comment Box</h1>

                        <Form style={{alignItems:"right"}} inline >
                            <Form.Control  value={this.state.comment} onChange={this.onChangeHandle} style={{borderRadius:30,marginRight:10,boxShadow:"0px 2px 8px #000000",marginBottom:10,padding:20,width:"60%" }}  placeholder="CommentHere" as="textarea" rows="3"  />
                            <Button  style={{borderRadius:20,height:"70px",boxShadow:"0px 2px 8px #000000"}} color="primary" onClick={this.onSubmit.bind(this)}>Submit</Button>
                        </Form>
                        <IconButton onClick={this.scrollToBottom.bind(this)} style={{boxShadow:"2px 2px 8px #424242",backgroundColor:"#ad1457",outline:"none",position:"fixed",padding:20,right:15,top:70}} edge="start" color="inherit" aria-label="menu">
                            <AddCommentIcon  style={{fontSize:30,color:"white"}}/>
                        </IconButton >
                    </div>
                    
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    
            </div>
        );
    }
}
 
export default CourseDetail;