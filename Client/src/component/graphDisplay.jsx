import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Grid,Col,Row} from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import Request from 'superagent';
import { Chart } from 'react-google-charts';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

const cardStyle={
  width:'80%'
}
class GraphDisplay extends Component
{
  constructor(props) {
        super(props);
        this.state={
          allData:''
        }
      }
  componentWillMount()
  {
var details=[];
      Request.get('http://10.201.174.176:9080/api/getResult/'+this.props.name).end((err,res)=>{

        console.log(res.body[0]);
        this.setState({
          allData:res.body[0]
        })
      });
      this.state.allData.map((data,i)=>{
      details[i]={"name":name[i]}
      });
  }
  render()
  {
    var Details;
    if(this.state.allData.questions)
    {
      var chart,answer=[];
     Details=this.state.allData.questions.map((data)=>{
            if(data.questiontype=="MultiChoice"||data.questiontype=="YesOrNo"||data.questiontype=="Dropdown")
            {
              answer=[];
              var count=0;
              answer.push(["Options","Count"]);
              data.options.map((opt)=>
              {
                count=0;
                data.count.map((obj)=>{
                  if(obj===opt)
                  ++count;
                });
                answer.push([opt,count]);
              });
              chart=(<Chart
                   chartType="PieChart"
                   data={answer}
                   options={{title:"Response Report",pieHole:0.4,is3D:true}}

                   width="100%"
                   height="400px"
                   legend_toggle
                 />);
            }
            else if(data.questiontype=="Checkbox")
            {
              answer=[];
              var count=0;
              answer.push(["Options","Count"]);
              data.options.map((opt)=>
              {

                count=0;
                data.count.map((obj)=>{
                  console.log("obj lenth ", obj.length);
                  var len=obj.length;
                  for( var i=0;i<len;i++){
                  if(obj[i]===opt)
                  ++count;
                  console.log("count of : ",opt, count);
                }});
                answer.push([opt.toString(),count]);
              });

              chart=(<Chart
                   chartType="PieChart"
                   data={answer}
                   options={{title:"Response Report",pieHole:0.4,is3D:true}}

                   width="100%"
                   height="400px"
                   legend_toggle
                 />);
            }
            else if(data.questiontype=="StarRatings")
            {
              answer=[];
              var count=0;
              answer.push(["Options","Count"]);
              data.options.map((opt)=>
              {
                count=0;
                data.count.map((obj)=>{
                  if(obj===opt)
                  ++count;
                });
                answer.push([opt.toString(),count]);
              });

              chart=(<Chart
                   chartType="PieChart"
                   data={answer}
                   options={{title:"Response Report",pieHole:0.4,is3D:true}}

                   width="100%"
                   height="400px"
                   legend_toggle
                 />);
            }
            else if(data.questiontype=="Slider")
            {
              answer=[];
              answer.push(["Options","Count"]);
              var max=data.maxValue;
              var scale=max/5;
              var limit=max/scale;
              var end,count,beg=0;

              for(var i=0;i<limit;i++)
              {

                end=beg+scale;
                count=0;
                console.log("i",i,scale,limit);
                data.count.map((obj)=>{
                  if(beg<=obj&&obj<end)
                  ++count;
                });
                answer.push([beg+"-"+end+" ("+count+")",count]);
                beg+=scale;
              }


              chart=(<Chart
                   chartType="PieChart"
                   data={answer}
                   options={{title:"Response Report",pieHole:0.4,is3D:true}}

                   width="100%"
                   height="400px"
                   legend_toggle

                 />);
            }
            else if(data.questiontype=="Comments"||data.questiontype=="SingleText")
            {
              chart=[];
              chart.push(<h3>User Comments</h3>)
              data.count.map((obj)=>{
              chart.push(<p style={{textAlign:"left",margin:20}}>{obj}<hr/></p>)
            });

            }
            return (
                     <Card>
                        <CardHeader
                          title={data.question}
                          actAsExpander={true}
                          />
                        <CardText expandable={true}>
                          <Col xs={12}>

                          {chart}


                            </Col>

                          </CardText>

                      </Card>

                        );

                      });}


    return(
            <div>
          {Details}
          </div>
        );
  }
}

export default GraphDisplay;
