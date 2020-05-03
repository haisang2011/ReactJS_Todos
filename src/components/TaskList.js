import React from 'react';
import TaskItems from "./TaskItems";

class TaskList extends React.Component {
    
    render() {
        var { tasks } = this.props; // = var task = this.props.tasks
        var elements = tasks.map((Elements, index) => {
            return <TaskItems onUpdateTask={this.props.onUpdateTask} onDeleteTask={this.props.onDeleteTask} onUpdateStatus={this.props.onUpdateStatus} key={Elements.id} index={index} element={Elements} />
        });
        return (
            <table className="table table-bordered table-hover" style={{marginTop : "15px"}}>
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" />
                        </td>
                        <td>
                            <select className="form-control">
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elements}
                </tbody>
            </table>
        );
    }
}

export default TaskList;