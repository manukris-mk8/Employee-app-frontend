import { useState, type FormEvent } from 'react'
import './CreateEmployee.css'
import { useNavigate } from 'react-router-dom'
import { FormComponent } from '../../components/form-component/FormComponent'
import store from '../../store/store'
import { PopupModal } from '../../components/popup-modal/PopupModal'
import { useCreateEmployeeMutation } from '../../api-services/employees/employee.api'
import LoadingComponent from '../../components/loadingComponent/LoadingComponent'
import { toast } from 'react-toastify'

const CreateEmployee = () => {

    const [isSuccess, setIsSuccess] = useState(false);
    const [createEmployee, { isLoading }] = useCreateEmployeeMutation();


    // const [counter,setCounter] = useState(0);
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

    // const [searchParams,setSearchParams] = useSearchParams();

    // const handleGetSearchParams = () => {
    //     console.log(searchParams.get("ennaVenam"))
    // }

    const onCreate = async () => {
        console.log("body", employeeData);

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
        // console.log('Updated employee:', employeeData);
        // const action = addEmployee (employeeData) ;
        // dispatch(action)
        // Add logic to update employee data in backend
        // navigate('/employees');
        // setIsSuccess(true);
        console.log(store.getState());

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
    // const handleSetSearchParams = () => {
    //     const newSearchParams = new URLSearchParams(searchParams);
    //     newSearchParams.set("ennaVenam","onnumVenda")
    //     setSearchParams(newSearchParams)
    // }
    // const handlePlusClick = () => {
    //     setCounter((prev)=>prev +1)
    // }

    const navigate = useNavigate()

    // const handleMinusClick = () => {
    //     setCounter((prev) => prev-1)
    // }

    if (isLoading) return <LoadingComponent />;

    return (

        <div>
            <div className='header'>
                <h1>Create Employees</h1>
            </div>
            <div className="create-emp-div">
                <FormComponent employee={employeeData} handleChange={handleChange} handleAddressChange={handleAddressChange} isEdit={false} handleSubmit={handleCreate} />

                {/* <div className="button">
                    <Button className="create-btn" type="submit" text="Create" onClick={handleCreate} />
                    <Button className="reset-btn" type="reset" text="Cancel" onClick={() => navigate('/employees')} /> */}

                {/* <p>Count = {counter}</p> */}
                {/* </div> */}
            </div>
            {isSuccess &&
                <PopupModal
                    mainText="Success"
                    subText="employee created successfully"
                    onClose={async () => setIsSuccess(false)}
                    onSubmit={() => navigate('/employees')}
                />
            }
        </div>


    )
}

export default CreateEmployee;