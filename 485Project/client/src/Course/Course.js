import React from 'react';
import { Form,Container,Col,Row,Collapse} from 'react-bootstrap';
import Cards from './Cards'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton';
import AddTwoToneIcon from '@material-ui/icons/AddTwoTone';


class Course extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            search:"",CID:"",CSJ:"",Desc:"",Credit:0,
            addClick:false,
            validated:false,
            course:[]
        }

        this.onChangeHandle = this.onChangeHandle.bind(this);
    }
    
    onChangeHandle(event){
        this.setState({search:event.target.value})
    }
    onChangeHandleDesc(event){
        this.setState({Desc:event.target.value})
    }
    onChangeHandleCID(event){
        this.setState({CID:event.target.value})
    }
    onChangeHandleCSJ(event){
        this.setState({CSJ:event.target.value})
    }
    onChangeHandleCredit(event){
        this.setState({Credit:event.target.value})
    }
    componentDidMount(){
        fetch('/courseList')
        .then(res => res.json())
        .then(course => { 
            this.setState({course})
         })

    }
    
    onClickAdd(event){
        const form = event.currentTarget;
        const bool = form.checkValidity();
        console.log(this.state.CID+" "+this.state.CSJ)
        if(bool){
            fetch('/AddCourse', {
                method: 'POST', 
                body: JSON.stringify({'id':this.state.CID,'name':this.state.CSJ,'desc':this.state.Desc,'credit':this.state.Credit}), 
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).then(
                fetch('/courseList')
                .then(res => res.json())
                .then(course => { 
                console.log(course);
                this.setState({course })
            })
            )
        }else{
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            this.setState({validated:true});
            console.log("stop fcking spam")
        }
        
    }
    AddBtnEvent(e){
        e.preventDefault();
        this.setState({addClick:!this.state.addClick})
    }

  render(){
   
let CourseCard = this.state.course.filter( data => {
        if(this.state.search === "")
            return data
        else if(data.CourseID.toLowerCase().includes(this.state.search.toLowerCase()))
            return data;
        else
            return null
        
 }).map(course => {
            return (
                <Col key={course.CourseID} sm="3" style={{paddingBottom:10}} >
                    <Cards course={course}/>
                </Col>
            )
})

   
  return (
  
    <div style={{padding:50,minWidth:'1050px'}}>
        <h1 style={{marginTop:30}}>Course List</h1>
        <div>
        <Form inline>
            <TextField style={{borderRadius:5,backgroundColor:"white",boxShadow:"2px 2px 8px #424242"}} value={this.state.search} onChange={this.onChangeHandle} id="standard-basic" label="Search Course By ID"  variant="filled"/>
 
        </Form>
        <IconButton onClick={this.AddBtnEvent.bind(this)} style={{boxShadow:"2px 2px 8px #424242",backgroundColor:"#ad1457",outline:"none",zIndex:9,position:"fixed",padding:20,right:15,top:70}} edge="start" color="inherit" aria-label="menu">
                    <AddTwoToneIcon  style={{fontSize:30,color:"white"}}/>
        </IconButton >
        <Collapse in={this.state.addClick}>

            <Form noValidate validated={this.state.validated} onSubmit={this.onClickAdd.bind(this)} style={{zIndex:9,boxShadow:"2px 2px 8px #424242",borderRadius:10,width:600,padding:10,backgroundColor:"#343a40",position:"absolute",right:200,top:70}}>
                    <div style={{display:"flex",columnCount:2}}>
                        <Form.Control  required size="sm"  style={{width:"150px",borderTopRightRadius:0,borderBottomRightRadius:0,borderBottomLeftRadius:0}}  value={this.state.CID} onChange={this.onChangeHandleCID.bind(this)} type="text" placeholder="CourseID" className=""/>
                        <Form.Control  required size="sm"  style={{width:"450px",borderTopLeftRadius:0,borderBottomLeftRadius:0,borderBottomRightRadius:0}} value={this.state.CSJ} onChange={this.onChangeHandleCSJ.bind(this)}type="text" placeholder="CourseSubject" className=""/>
                    </div>
                    <Form.Control  required size="sm" style={{borderRadius:0}} onChange={this.onChangeHandleCredit.bind(this)} type="text" placeholder="Credit" className="mr-sm-2"/>
                    <Form.Control  required style={{borderTopLeftRadius:0,borderTopRightRadius:0,maxHeight:80 }} value={this.state.Desc} onChange={this.onChangeHandleDesc.bind(this)} placeholder="CourseDescription" as="textarea" rows="3"  />
                    <Button variant="contained" color="primary" type="submit">Add</Button>
            </Form>

        </Collapse>
        </div>
        <Container fluid>
            <Row style={{marginTop:50}}>
                {CourseCard}
            </Row>
        </Container>

    </div>

  );}
}

export default Course;
