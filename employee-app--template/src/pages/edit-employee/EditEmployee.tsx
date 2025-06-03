import { useState, useEffect, type FormEvent } from 'react';
import '../create-employee/CreateEmployee.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FormComponent } from '../../components/form-component/FormComponent';
import store from '../../store/store';
import { PopupModal } from '../../components/popup-modal/PopupModal';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation } from '../../api-services/employees/employee.api';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import { toast } from 'react-toastify';

const EditEmployee = () => {


    const params = useParams<{ id: string }>();
    const id = Number(params.id);

    // const mockDatas = store.getState().employees

    const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

    const [isSuccess, setIsSuccess] = useState(false);

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
    // const data = getEmployeeById.data;

    const onUpdate = async () => {
        // console.log("body", employeeData);

        updateEmployee(employeeData)
            .unwrap()
            .then((response) => {
                console.log("updation success", response);
                toast("Employee updated successfully", { type: 'success' })

            }).catch((error) => {
                toast(error.data.message,{type:'error'})

            })
    }

    // const mockData = data?.find((item) => item.id === id)
    // const data = useAppSelector((state) => state.employee.employees)

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
        // console.log('Updated employee:', employeeData);
        // const action = {type:EMPLOYEE_ACTION_TYPES.UPDATE,payload: employeeData};
        // dispatch(action)
        // Add logic to update employee data in backend
        navigate('/employees');
        console.log(store.getState());

        // setIsSuccess(true);


    };

    // const handleCancel = () => {
    //     navigate('/employees');
    // };

    if (isLoading) return <LoadingComponent />;

    return (
        <div>
            <div className='header'>
                <h1>Edit Employee</h1>
            </div>
            <div className="create-emp-div">
                <FormComponent employee={employeeData} handleChange={handleChange} handleAddressChange={handleAddressChange} isEdit={true} handleSubmit={handleUpdate} />
                {/* <div className="button">
                    <Button className="create-btn" type="submit" text="Update" onClick={handleUpdate} />
                    <Button className="reset-btn" type="button" text="Cancel" onClick={handleCancel} />
                </div> */}
            </div>
            {isSuccess &&
                <PopupModal
                    mainText="Success"
                    subText="employee updated successfully"
                    onClose={async () => setIsSuccess(false)}
                    onSubmit={() => navigate('/employees')}
                />
            }
        </div>
    );
};

export default EditEmployee;