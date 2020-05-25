import React from 'react'
import Button from '@material-ui/core/Button'
import { Form,Collapse} from 'react-bootstrap';
import { Rating } from '@material-ui/lab/';
import Skel from '@material-ui/lab/Skeleton'





class Page extends React.Component{
    
    constructor(p){
        super(p)
        this.state = {course:[],
                     comment:[],
                     ShowBtn:false,
                     active:0,
                     Ranking:0
                    ,index:0}
    }
    componentDidMount(){
         fetch('/course')
         .then(res => res.json())
         .then(course => { 
            this.setState({course})
          })
        this.getData()
        setInterval(this.getData, 1000); 
    }
    getData = () => {
        /*fetch('/course')
        .then(res => res.json())
        .then(course => { 
            this.setState({course})
         }).then(*/
        fetch('/getComment')
        .then(res => res.json())
        .then(comment => {
            this.setState({comment})
        })
        
        //)
    }
   
    handleReview(){
        fetch('/UpdataRank', {
            method: 'PUT', 
            body: JSON.stringify({'CourseID':this.props.course,'Rank':this.state.Ranking}), 
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        })
        this.setState({ShowBtn:false})
    }
   
    render(){
        
        let Courseinfo = this.state.course.map((course,index) => {
            
            if(this.props.course===course.CourseID){
                
                return (
                    <div key={course.CourseID} style={{}}>
                        <Form.Label style={{fontSize:25}}>Course</Form.Label>
                        <Form.Control readOnly value={"Course ID : "+course.CourseID+"\nCourse NAME : "+course.Coursename+"\nCredit : "+course.Credit} as="textarea" rows="6" style={{fontSize:"1em",minHeight:150,maxHeight:150,boxShadow:"0px 2px 8px #000000",minWidth:450,maxWidth:450,borderRadius:30,padding:25,backgroundColor:"white"}} />
                        <Form.Label style={{fontSize:25}}>Descript</Form.Label>
                        <Form.Control readOnly value={course.CourseDesc} placeholder="CourseDescription" as="textarea" rows="9" style={{boxShadow:"0px 2px 8px #000000",fontSize:"1em",minHeight:200,width:"80%",borderRadius:30,padding:25,backgroundColor:"white" }} />
                    </div>
                )
            }
            return null;
    })
    let Comment = this.state.comment.filter(
        data => {
            if(data.CourseID.toLowerCase().includes(this.props.course.toLowerCase()))
                return data;
            else
                return null
    }
    ).map((comment,i) => {
        return (
            <div key={i} style={{}}>
                <Form style={{boxShadow:"0px 2px 8px #000000",borderRadius:20,backgroundColor:"white",width:"60%",minWidth:"700px",padding:20,marginTop:20}}> 
                        <div>
                            <span style={{color:"gray"}}> <h4 style={{color:"#263238"}}>{comment.UserID}</h4> {comment.Date}</span>
                        </div>
                            <Form.Control readOnly value={comment.Comment} as="textarea" rows="6" style={{minHeight:150,maxHeight:150,minWidth:450,maxWidth:450,borderRadius:30,padding:25,backgroundColor:"white"}} />
                </Form>
            </div>
        )
    })
   
        return (
           
            <div style={{marginLeft:300,padding:33}}>

                <Skel animation="pulse" variant="rect" width={"80%"} height={356} style={{boxShadow:"0px 2px 8px #000000",borderRadius:40,marginBottom:30,opacity:"0.7",background: 'linear-gradient(45deg, #bbdefb 30%, #FF8E53 90%)'}} />
           
                <div>
                    <h4>Rate Now</h4>
                    <Rating  style={{boxShadow:"0px 2px 8px #000000",paddingTop:10,paddingLeft:10,paddingRight:10,borderRadius:30,backgroundColor:"white"}} onChange={(event,val)=>{
                        this.setState({ShowBtn:!this.state.ShowBtn})
                        this.setState({Ranking:val})}}name="size-large"size="large"/>
                    <Collapse in={this.state.ShowBtn} >
                        <div style={{position:"absolute", left:520, top:635}}>
                            <Button style={{backgroundColor:"white"}} onClick={this.handleReview.bind(this)}>confirm</Button>
                        </div>
                    </Collapse>
                </div>
               
               
                <div style={{padding:33}}>
                    {Courseinfo}
                </div>
                <div style={{marginLeft:-300,backgroundColor:"#455a64" ,marginBottom:30, width:"120%",height:3}}></div>
                <h3>Comment</h3>
                {Comment}

             
            </div>
           
            )
    }
}
export default Page;