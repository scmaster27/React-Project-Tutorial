import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    render(){
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    顧客追加
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>顧客追加</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}  /><br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "プロフィール イメージ選択" : this.state.fileName}
                            </Button>
                        </label><br />
                        <TextField label="名前" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="生年月日" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}  /><br />
                        <TextField label="性別" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}  /><br />
                        <TextField label="職業" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}  /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>追加</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>閉じる</Button>
                    </DialogActions>
                </Dialog>
            </div>
            // <form onSubmit={this.handleFormSubmit}>
            //     <h1>顧客追加</h1>
            //     プロフィルイメージ：<input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}  /><br />
            //     名前：<input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
            //     生年月日：<input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}  /><br />
            //     性別：<input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}  /><br />
            //     職業：<input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}  /><br />
            //     <button type="submit">追加</button>
            // </form>
        )
    }
}

export default withStyles(styles)(CustomerAdd);
