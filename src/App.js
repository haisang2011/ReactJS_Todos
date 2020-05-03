import React from 'react';
import './App.css';
import TagForm from './components/TagForm';
import Search_Sort from './components/Search_Sort';
import TaskList from './components/TaskList';
var randomstring = require("randomstring");

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Tasks : [],
            isDisplayForm : false,
            taskEditing : null
        }
    }

    componentDidMount(){
        if(localStorage && localStorage.getItem("tasks")){
            var task = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                Tasks : task
            })
        }
    }

    onGeneratorData = () => {
        var Tasks = [
            {
                id:randomstring.generate({
                    length : 7,
                    charset : 'numeric'
                }),
                name:"Học Lập Trình",
                status : true
            },
            {
                id:randomstring.generate({
                    length : 7,
                    charset : 'numeric'
                }),
                name:"Đi Bơi",
                status : false
            },
            {
                id:randomstring.generate({
                    length : 7,
                    charset : 'numeric'
                }),
                name:"Đi Ngủ ",
                status : true
            }
        ];
        this.setState({
            Tasks : Tasks
        });
        localStorage.setItem('tasks',JSON.stringify(Tasks));
    }

    ChangeDisplay = () => {
        var check = this.state.isDisplayForm;
        if(check){
            this.setState({isDisplayForm : true, taskEditing:null});
        }else{
            this.setState({isDisplayForm : !check, taskEditing:null});
        }

    }

    onCloseForm = () => {
        this.setState({isDisplayForm : false, taskEditing:null});
    }

    onShowForm = () => {
        this.setState({isDisplayForm : true});
    }

    onSubmitForm = (Data) => {
        var {Tasks} = this.state;
        if(Data.id === ''){
            Data.id = randomstring.generate({
                length : 7,
                charset : 'numeric'
            });
            Tasks.push(Data);
        }else{ 
            //Edit
            this.state.Tasks.map((Element, index) => {
                if(Element.id == Data.id){
                    Tasks[index] = Data;
                }
            });
        }
        this.setState({
            Tasks : Tasks,
            taskEditing : null
        });
        localStorage.setItem('tasks', JSON.stringify(Tasks));
    }

    // LocalStorage : setItem('key', value); getItem('key'); removeItem('key');

    onUpdateStatus = (id) => {
        var {Tasks} = this.state;
        this.state.Tasks.map((Element, index) => {
            if(Element.id == id){
                Tasks[index].status = !Tasks[index].status;
                this.setState({
                    Tasks : Tasks
                });
                localStorage.setItem('tasks',JSON.stringify(Tasks));
            }
        });
    }

    onDeleteTask = (id) => {
        var {Tasks} = this.state;
        this.state.Tasks.map((element, index) => {
            if(element.id == id){
                Tasks.splice(index,1);
            }
            this.setState({
                Tasks : Tasks
            });
            localStorage.setItem('tasks', JSON.stringify(Tasks));
        });
        this.onCloseForm();
    }

    onUpdateTask = (id) => {
        var TaskEditing;
        var {Tasks} = this.state;
        this.state.Tasks.map((element, index) => {
            if(element.id == id){
                TaskEditing = Tasks[index];
                this.setState({
                    taskEditing : TaskEditing
                });
            }
        });
        this.onShowForm();
    }

    render(){
        var {Tasks, isDisplayForm, taskEditing} = this.state;
        var elmTaskForm = isDisplayForm === true ? <TagForm task={taskEditing} PropsSubmit={this.onSubmitForm} onCloseForm={this.onCloseForm} /> : "";
    return(
    <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                {elmTaskForm}
            </div>
            <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button onClick={this.ChangeDisplay} type="button" className="btn btn-primary">
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button onClick={this.onGeneratorData} type="button" className="btn btn-danger">
                    Generator Data
                </button>
                <div className="row mt-15">
                    <Search_Sort />
                </div>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList tasks={Tasks} onUpdateTask={this.onUpdateTask} onDeleteTask={this.onDeleteTask} onUpdateStatus={this.onUpdateStatus} />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;




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
