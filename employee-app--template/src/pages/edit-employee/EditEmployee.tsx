import { useState, useEffect, type FormEvent } from 'react';
import '../create-employee/CreateEmployee.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FormComponent } from '../../components/form-component/FormComponent';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../api-services/employees/employee.api';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import { toast } from 'react-toastify';

const EditEmployee = () => {


    const params = useParams<{ id: string }>();
    const id = Number(params.id);


    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

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

    const { data } = useGetEmployeeByIdQuery({ id });

    const onUpdate = async () => {

        updateEmployee(employeeData)
            .unwrap()
            .then(() => {
                toast("Employee updated successfully", { type: 'success' })

            }).catch((error) => {
                toast(error.data.message, { type: 'error' })

            })
    }
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setEmployeeData({
                ...data,
                departmentId: data.department?.id
            });
        }
    }, [id, data]);


    const handleChange = (field: string, value: string | number) => {

        setEmployeeData(prev => ({
            ...prev,
            [field]: value
        }));
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

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        onUpdate();
        navigate('/employees');



    };

    if (isLoading) return <LoadingComponent />;

    return (
        <div>
            <div className='header'>
                <h1>Edit Employee</h1>
            </div>
            <div className="create-emp-div">
                <FormComponent employee={employeeData} handleChange={handleChange} handleAddressChange={handleAddressChange} isEdit={true} handleSubmit={handleUpdate} />
            </div>
        </div>
    );
};

export default EditEmployee;