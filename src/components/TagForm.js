import React from 'react';

class TagForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    onCloseForm = () =>{
        this.props.onCloseForm();
    }

    onChangeForm = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name] : value
        });
    }

    onSubmitForm = (event) =>{
        event.preventDefault();
        this.props.PropsSubmit(this.state);
        this.BtnClear();
        this.props.onCloseForm();
    }

    BtnClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    componentDidMount(){
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status
            });
        }else if(nextProps && nextProps.task === null){ // Or !nextProps.task
            this.state = {
                id : '',
                name : '',
                status : false
            }
        }
    }

    render() {
        var {id} = this.state
        return (
                <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm công việc'}
                            <span onClick={this.onCloseForm} className="fa fa-times-circle text-right float-right"></span>
                        </h3>
                        
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmitForm}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChangeForm} />
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" name="status" required="required" value={this.state.status} onChange={this.onChangeForm}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">{id !== '' ? 'Lưu lại' : 'Thêm'}</button>&nbsp;
                                <button type="button" onClick={this.BtnClear} className="btn btn-danger">Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

export default TagForm;




// this is a way writing of ES6
// class App extends React.Component{
//   render(){
//     return(
//       ...
//     );
//   }
// }


// this is a way writing traditional
// function App() {
//   return (
//     <div>
//       <Header />
//     </div>
//   );
// }
