import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { Drawer, Typography, withStyles, AppBar, Toolbar, List, ListItem, ListItemText } from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import { Button } from '@material-ui/core';
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";
const drawerWidth = 200
const appbarHeight = 64

const useStyles = (theme)=>({
  drawer : {
    width : drawerWidth,
    height : `calc(100% - ${appbarHeight}px)`,
    top : appbarHeight
  },
  drawerPaper : {
    width : drawerWidth,
    height : `calc(100% - ${appbarHeight}px)`,
    top : appbarHeight
  },
  flex : {
    display : 'flex'
  },
  content : {
    margin:'auto'
  },
  addHeight : theme.mixins.toolbar,
  title : {
    flexGrow : 1
  },
  appbar : {
    height : appbarHeight
  }
})

class StudentHomepage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      content:(
      <div class="container">
        
          <h1 >Guidelines </h1>
        <div class="centered">      
            <ol>
                <li>Students must not engage in any form of malpractice during the exam.</li>
                <li>Plagiarism, cheating, and unauthorized collaboration are strictly prohibited.</li>
                <li>Using external resources or unauthorized materials during the exam is not allowed.</li>
                <li>Impersonation or having someone else take the exam on behalf of the student is a serious violation.</li>
                <li>Accessing or sharing exam questions or answers before or after the exam period is forbidden.</li>
                <li>Students should not attempt to tamper with the exam software, data, or security measures.</li>
                <li>Engaging in any form of disruptive behavior during the exam is unacceptable.</li>
                <li>Falsifying personal information or identification for the exam is a breach of rules.</li>
                <li>Using any unauthorized aids or devices to gain an unfair advantage is against the rules.</li>
                <li>Any violation of these rules will result in appropriate penalties and disciplinary actions.</li>
                <br>
                </br>
            </ol>
        </div>
     </div>
    ),
      menuList:[{
        title:'Home',
        content:(
          <div>
          <ol>
              <li>Students must not engage in any form of malpractice during the exam.</li>
              <li>Plagiarism, cheating, and unauthorized collaboration are strictly prohibited.</li>
              <li>Using external resources or unauthorized materials during the exam is not allowed.</li>
              <li>Impersonation or having someone else take the exam on behalf of the student is a serious violation.</li>
              <li>Accessing or sharing exam questions or answers before or after the exam period is forbidden.</li>
              <li>Students should not attempt to tamper with the exam software, data, or security measures.</li>
              <li>Engaging in any form of disruptive behavior during the exam is unacceptable.</li>
              <li>Falsifying personal information or identification for the exam is a breach of rules.</li>
              <li>Using any unauthorized aids or devices to gain an unfair advantage is against the rules.</li>
              <li>Any violation of these rules will result in appropriate penalties and disciplinary actions.</li>
          </ol>
          <br></br>
          <Typography variant='h6' align="center">
                   <Button variant="contained`" className={this.props.classes.endtestbtn} onClick={()=>(this.UpcomingStudentTestsDetails())}>Start Exam</Button>
                  </Typography>
      </div>
        )      
      },{
        title : 'View All tests',
        content:<TestDetailsStudent/>
      },{
        title : 'Upcoming Tests',
        content:<UpcomingStudentTestsDetails/>
      },{
        title : 'Completed Tests',
        content : <CompletedTestsDetailsStudent/>
      }]
    }
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    })
  }

  render(){
    if(!Auth.retriveToken() || Auth.retriveToken()==='undefined'){
      return (<Navigate to='/'/>);
    } else if(!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if(this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/'/>);
    }
    return(
      <div >
        <div>
          <AppBar
            elevation={0}
            className={this.props.classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={this.props.classes.title}>
                Student Homepage
              </Typography>
              <Typography variant='h6'>
                welcome, {this.props.user.userDetails.username} !!
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={this.props.classes.addHeight}></div>
        </div>
        <div className={this.props.classes.flex}>
          <Drawer
            className={this.props.classes.drawer}
            variant="permanent"
            anchor="left"
            classes= { {paper:this.props.classes.drawerPaper}}
          >
            <List>
              {this.state.menuList.map((item,index)=>(
                <ListItem button key={index} onClick={()=>(this.onMenuItemClick(item.content))}>
                  <ListItemText primary={item.title}/>
                </ListItem>
              ))}
              <ListItem>
                <LogoutButton/>
              </ListItem>
            </List>
          </Drawer>
          <div className={this.props.classes.content}>
            
          <AlertBox></AlertBox>
          {this.state.content}
            
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user:state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps,{
  getUserDetails
})(StudentHomepage));