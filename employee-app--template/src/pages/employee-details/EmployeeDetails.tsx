import { useNavigate, useParams } from "react-router-dom"
import { EmployeeDetailsComponent } from "../../components/emp-details/EmployeeDetailsComponent";
import './EmployeeDetails.css'
import editLogo from '../../assets/editWhite.png'
import { SpecialButton } from "../../components/button/SpecialButton";
import { useGetEmployeeByIdQuery } from "../../api-services/employees/employee.api";
import LoadingComponent from "../../components/loadingComponent/LoadingComponent";

const EmployeeDetails = () => {

    const params = useParams<{ id: string }>();
    const id = Number(params.id); 

    const navigate = useNavigate();

    // const dummySub = {
    //     id: 0,
    //     name: '',
    //     employeeId: '',
    //     dateOfJoining: '',
    //     role: '',
    //     status: '',
    //     departmentId: 0,
    //     experience: 0,
    //     age: 0,
    //     email: '',
    //     password: '',
    //     address: {
    //         houseNo: '',
    //         line1: '',
    //         line2: '',
    //         pincode: '',
    //     }
    // }

    const {data,isLoading} = useGetEmployeeByIdQuery({ id });
    // const data = getEmployeeById.data;

    // console.log("emp",data);
    
    // const employee = getEmployees.data?.find((item) => item.id === Number(id)) || dummySub
     if (isLoading || !data) return <LoadingComponent/>;


    return (
        <>
            <div className='header'>
                <h1>Employee Details</h1>
                {/* <button className="create-emp-btn" type={"submit"} onClick={()=>{navigate(`/employees/edit/${id}`)}} >
                <span className="circle-icon">
                    <img width={20} height={20} src={editLogo} alt="edit"/>
                </span>
                    Edit</button> */}
                <SpecialButton text={"Edit"} className={"create-emp-btn"} type="button" imageIcon={editLogo} onClick={() => { navigate(`/employees/edit/${id}`) }} />
            </div>
            <EmployeeDetailsComponent employee={data} />

        </>
    )
}

export default EmployeeDetails;