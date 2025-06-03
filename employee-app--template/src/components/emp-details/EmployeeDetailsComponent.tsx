// import { useNavigate } from "react-router-dom";
import type { Employee } from '../../store/employee/employee.types';
import './EmployeeDetailsComponent.css'

interface props {
    employee: Employee
}
export const EmployeeDetailsComponent = (props: props) => {

    const { name, employeeId, dateOfJoining, role, status, experience, address } = props.employee

    // const navigate = useNavigate();

    let color;
    if (status === "ACTIVE") {
        color = "#D3F4BE"
    }
    else if (status === "PROBATION") {
        color = "#F5ECB8"
    }
    else {
        color = "#FFBFBF"
    }
    return (
        <div className="outer-div">
            <div className="emp-details-div">
                <div>
                    <label>Employee Name</label>
                    {name}
                </div>

                <div>
                    <label>Joining Date</label>
                    {dateOfJoining}
                </div>
                <div>
                    <label>Role</label>
                    {role}
                </div>
                <div>
                    <label>Status</label>
                    <span style={{ backgroundColor: color }}>
                        {status}
                    </span>
                </div>
                <div>
                    <label>Experience</label>
                    {experience} years
                </div>
            </div>

            <div className="partition-line"></div>

            <div className="emp-details-div" style={{ justifyContent: "left" }}>

                <div>
                    <label>Address</label>
                    <div>{address.houseNo}, {address.line1},</div>
                    <div>{address.line2},</div>
                    <div>{address.pincode}</div>


                </div>

                <div>
                    <label>Employee Id</label>
                    {employeeId}
                </div>
            </div>
        </div>
    )
}