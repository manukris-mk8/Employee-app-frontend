import { useState, useEffect} from 'react';
import '../create-employee/CreateEmployee.css';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form-component/FormComponent';
import { useGetEmployeeByIdQuery } from '../../api-services/employees/employee.api';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const Profile = () => {


    const token = localStorage.getItem('token')
    const userDetails = token && JSON.parse(token)
    const id = userDetails.id


    const [employeeData, setEmployeeData] = useState({
        id: 1,
        name: '',
        employeeId: '',
        email: '',
        password: '',
        age: 0,
        dateOfJoining: '',
        role: '',
        departmentId: 0,
        status: '',
        experience: 0,
        address: {
            houseNo: '',
            line1: '',
            line2: '',
            pincode: ''
        }
    });

    const { data,isLoading } = useGetEmployeeByIdQuery({ id });

    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setEmployeeData({
                ...data,
                departmentId: data.department?.id
            });
        }
    }, [id, data]);

    

    if (isLoading) return <LoadingComponent />;

    return (
        <div>
            <div className='header'>
                <h1>Profile</h1>
            </div>
            <div className="create-emp-div">
                <FormComponent employee={employeeData} isProfile={true} handleSubmit={() => navigate(`/employees/edit/${id}`)} userName={userDetails.name}/>
            </div>
        </div>
    );
};

export default Profile;