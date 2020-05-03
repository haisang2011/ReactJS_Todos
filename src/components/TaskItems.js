import React from 'react';

class TaskItems extends React.Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.element.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.element.id);
    }

    onUpdateTask = () => {
        this.props.onUpdateTask(this.props.element.id);
    }

    render() {
        var { element, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{element.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={(element.status) === true ? "label label-success" : "label label-danger"}>
                        {element.status === true ? "Kích Hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={this.onUpdateTask} type="button" className="btn btn-warning">
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button> &nbsp;
                    <button onClick={this.onDeleteTask} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItems;