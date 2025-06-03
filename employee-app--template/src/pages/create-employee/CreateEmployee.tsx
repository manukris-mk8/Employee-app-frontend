import { useState, type FormEvent } from 'react'
import './CreateEmployee.css'
import { useNavigate } from 'react-router-dom'
import { FormComponent } from '../../components/form-component/FormComponent'
import { useCreateEmployeeMutation } from '../../api-services/employees/employee.api'
import LoadingComponent from '../../components/loadingComponent/LoadingComponent'
import { toast } from 'react-toastify'

const CreateEmployee = () => {

    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();


    const [employeeData, setEmployeeData] = useState({
        id: 1,
        name: '',
        employeeId: '',
        email: '',
        age: 0,
        password: '',
        dateOfJoining: '',
        role: '',
        departmentId: '',
        status: '',
        experience: 0,
        address: {
            houseNo: '',
            line1: '',
            line2: '',
            pincode: ''
        }
    });

    const onCreate = async () => {

        createEmployee(employeeData)
            .unwrap()
            .then((response) => {
                console.log("creation success", response);
                toast("Employee created successfully", { type: 'success' })

            }).catch((error) => {
                toast(error.data.message, { type: 'error' })

            })
    }

    const handleChange = (field: string, value: string | number) => {
        setEmployeeData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreate = (e: FormEvent) => {
        e.preventDefault()
        onCreate();
        navigate('/employees');

    };

    const handleAddressChange = (field: string, value: string) => {
        setEmployeeData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
    };

    const navigate = useNavigate()

    if (isLoading) return <LoadingComponent />;

    return (

        <div>
            <div className='header'>
                <h1>Create Employees</h1>
            </div>
            <div className="create-emp-div">
                <FormComponent employee={employeeData} handleChange={handleChange} handleAddressChange={handleAddressChange} isEdit={false} handleSubmit={handleCreate} />
            </div>
        </div>


    )
}

export default CreateEmployee;