import { useNavigate } from "react-router-dom"
import { Button } from "../button/Button"
import { Input } from "../input/Input"
import { SelectComponent } from "../select/SelectComponent"
import './FormComponent.css'
import { useRef, type FormEventHandler } from "react"
import { useGetDepartmentsQuery } from "../../api-services/departments/department.api"
import profileIcon from '../../assets/profile-icon.png'

interface props {
    employee?: {
        id: number,
        name: string,
        employeeId: string,
        email: string,
        age: number,
        password: string,
        dateOfJoining: string,
        role: string,
        departmentId: number | string,
        status: string,
        experience: number,
        address: {
            houseNo: string,
            line1: string,
            line2: string,
            pincode: string
        }
    },
    userName?: string
    handleChange?: ((field: string, value: string | number) => void)
    handleAddressChange?: ((field: string, value: string) => void)
    isEdit?: boolean
    isProfile?: boolean
    handleSubmit?: FormEventHandler<HTMLFormElement>
}

export const FormComponent = (props: props) => {

    const navigate = useNavigate();

    const getDepartments = useGetDepartmentsQuery();
    // console.log("depts",getDepartments);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const departments = getDepartments?.data?.map(dept => ({
        value: String(dept.id),
        label: dept.name
    }));

    const roles = [{
        value: "HR",
        label: "HR"
    }, {
        value: "DEVELOPER",
        label: "DEVELOPER"
    }, {
        value: "UI",
        label: "UI"
    }, {
        value: "UX",
        label: "UX"
    }]

    // console.log("depts",departments);

    const buttonText = props.isEdit
        ? "Update"
        : props.isProfile
            ? "Edit"
            : "Create";

    <Button className="create-btn" type="submit" text={buttonText} />;

    const status = [
        { value: "ACTIVE", label: "ACTIVE" },
        { value: "INACTIVE", label: "INACTIVE" },
        { value: "PROBATION", label: "PROBATION" }
    ]

    return (
        <form onSubmit={props.handleSubmit}>
            {props.isProfile && (
                <div className="profile-icon">

                    <h1>{props.userName}</h1>
                    {/* <CgProfile size={120} color="white"/> */}
                    <img src={profileIcon} width={140} height={140} alt="profile-icon" onClick={() => fileInputRef.current?.click()}/>
                    <input 
                    type="file"
                    accept="image/*"
                    ref = {fileInputRef}
                    style={{display:'none'}}/>
                </div>

            )}
            <div className='form'>
                <Input id="employeeName" disabled={props.isProfile} type='text' className='form-element' placeholder='Employee Name' label='Employee Name' value={props.employee ? props.employee.name : ''} onChange={(e) => { props.handleChange && props.handleChange("name", e.target.value) }} />
                <Input id="email" disabled={props.isEdit || props.isProfile} type='text' className='form-element' placeholder='Email' label='Email' value={props.employee ? props.employee.email : ''} onChange={(e) => { props.handleChange && props.handleChange("email", e.target.value) }} />
                <Input id="employeeId" disabled={props.isEdit || props.isProfile} type='text' className='form-element' placeholder='Employee Id' label='Employee Id' value={props.employee ? props.employee.employeeId : ''} onChange={(e) => { props.handleChange && props.handleChange("employeeId", e.target.value) }} />
                <Input id="age" type='text' disabled={props.isProfile} className='form-element' placeholder='Age' label='Age' value={props.employee ? props.employee.age : ''} onChange={(e) => { props.handleChange && props.handleChange("age", Number(e.target.value)) }} />

                <Input id="password" type='password' disabled={props.isProfile} className='form-element' placeholder='Password' label='Password' value={props.employee ? props.employee.password : ''} onChange={(e) => { props.handleChange && props.handleChange("password", e.target.value) }} required={!props.isEdit} />
                <Input id="joinDate" type='date' className='form-element' disabled={props.isProfile} placeholder='Joining Date' label='Joining Date' value={props.employee ? props.employee.dateOfJoining : ''} onChange={(e) => { props.handleChange && props.handleChange("dateOfJoining", e.target.value) }} />
                <Input id="experience" type='text' className='form-element' placeholder='Experience' disabled={props.isProfile} label='Experience(Yrs)' value={props.employee ? props.employee.experience : ''} onChange={(e) => { props.handleChange && props.handleChange("experience", Number(e.target.value)) }} />

                <SelectComponent id="department" label='Department' disabled={props.isProfile} placeholder='department' options={departments} className='form-element' value={props.employee ? props.employee.departmentId : ''} onChange={(e) => { props.handleChange && props.handleChange("departmentId", Number(e.target.value)) }} />
                <SelectComponent id="role" label='Role' placeholder='role' disabled={props.isProfile} className='form-element' options={roles} value={props.employee ? props.employee.role : ''} onChange={(e) => { props.handleChange && props.handleChange("role", e.target.value) }} />

                <div className="form-element">
                    <label htmlFor="address">Address</label>
                    <input id="houseNo" type="text" disabled={props.isProfile} name="houseNo" placeholder="Flat No / House No" value={props.employee?.address.houseNo} onChange={(e) => props.handleAddressChange && props.handleAddressChange("houseNo", e.target.value)} />
                    <input id="line1" type="text" disabled={props.isProfile} name="addressLine1" placeholder="Address Line 1" value={props.employee?.address.line1} onChange={(e) => props.handleAddressChange && props.handleAddressChange("line1", e.target.value)} />
                    <input id="line2" type="text" disabled={props.isProfile} name="addressLine2" placeholder="Address Line 2" value={props.employee?.address.line2} onChange={(e) => props.handleAddressChange && props.handleAddressChange("line2", e.target.value)} />
                    <input id="pincode" type="text" disabled={props.isProfile} name="pincode" placeholder="Pincode" value={props.employee?.address.pincode} onChange={(e) => props.handleAddressChange && props.handleAddressChange("pincode", e.target.value)} />

                </div>
                <SelectComponent id="status" label='Status' disabled={props.isProfile} placeholder='status' className='form-element' options={status} value={props.employee ? props.employee.status : ''} onChange={(e) => { props.handleChange && props.handleChange("status", e.target.value) }} />

            </div>
            <div className="button">
                <Button className="create-btn" type="submit" text={buttonText} />
                <Button className="reset-btn" type="reset" text="Cancel" onClick={() => navigate('/employees')} />

                {/* <p>Count = {counter}</p> */}
            </div>
        </form>
    )
}