import './ListRowComponent.css'
// import { MdDelete,MdModeEdit } from "react-icons/md";
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import { useNavigate } from 'react-router-dom';
import { useState, type MouseEvent } from 'react';
import { PopupModal } from '../popup-modal/PopupModal';
// import { EMPLOYEE_ACTION_TYPES } from '../../store/employee/employee.types';
// import { useDispatch } from 'react-redux';
import store from '../../store/store';
import { useDeleteEmployeeMutation } from '../../api-services/employees/employee.api';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { toast } from 'react-toastify';

interface props {
    employee: {
        id: number
        name: string;
        employeeId: string;
        dateOfJoining: string;
        role: string;
        status: string;
        experience: string | number;
        address: {
            houseNo: string,
            line1: string,
            line2: string,
            pincode: string
        };
    }
}
export const ListRowComponent = (props: props) => {

    const { id, name, employeeId, dateOfJoining, role, status, experience } = props.employee
    const [deleteEmployee, { isLoading }] = useDeleteEmployeeMutation();
    // const [error, setError] = useState('');

    // const dispatch = useAppDispatch()

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setOpenDeleteModal(true);
        // alert("do you really want to delete")

    }
    const handleDeleteConfirm = (e: any) => {
        e.preventDefault();
        onDelete()
        // const action = {type:EMPLOYEE_ACTION_TYPES.DELETE, payload: props.employee};
        // dispatch(action)
        // Add logic to update employee data in backend
        // navigate('/employees');
        console.log(store.getState());

    }
    const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate(`edit/${id}`);
    }
    const navigate = useNavigate();

    const onDelete = async () => {
        deleteEmployee({ id })
            .unwrap()
            .then(() => {
                console.log("deletion success");
                toast("Employee deleted successfully", { type:'success'})
            }).catch((error) => {
                // setError(error.data.message)
                toast(error.data.message,{type:'error'})
            })
    }

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
    if (isLoading) return <LoadingComponent />;

    return (
        <>

            <div className="list-emp-div" onClick={() => navigate(`details/${id}`)}>
                <div>
                    {name}
                </div>
                <div>
                    {employeeId}
                </div>
                <div>
                    {dateOfJoining}
                </div>
                <div>
                    {role}
                </div>
                <div >
                    <span style={{ borderRadius: "20px", backgroundColor: color, padding: 8 }}>
                        {status}
                    </span>
                </div>
                <div>
                    {experience} years
                </div>
                <div className='action-buttons'>
                    <div>
                        <button onClick={(e) => handleDelete(e)}>
                            {/* <MdDelete/> */}
                            <img src={deleteIcon} alt='delete' />
                        </button>
                    </div>
                    <div>
                        <button onClick={(e) => handleEdit(e)}>
                            {/* <MdModeEdit/> */}
                            <img src={editIcon} alt='edit' />
                        </button>
                    </div>
                </div>
            </div>
            {openDeleteModal &&
                <PopupModal
                    mainText="Are you sure ?"
                    subText="Do you really want to delete the employee ?"
                    onClose={async () => setOpenDeleteModal(false)}
                    onSubmit={handleDeleteConfirm}
                />
            }
            {/* {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={handleCloseToast}
                />
            )} */}
        </>
    )
}