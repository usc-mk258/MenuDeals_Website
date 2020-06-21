import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {countries} from 'constant'



export default class ControlledOpenSelect extends Component {
  state={
      Country:"",
  }

   handleChange = (e) => {
    this.setState({Country: e.target.value});
  };


render(){
  return (
    <div>
      <FormControl style={{width: "291px"}}>
        <InputLabel id="demo-controlled-open-select-label">{this.props.title}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
         fullWidth
          value={this.props.value}
          onChange={this.props.handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countries.map((e)=>{
              return(
                <MenuItem value={e.label}>{e.label}</MenuItem>
              )
          })

          }
        </Select>
      </FormControl>
    </div>
  );
        }
}
