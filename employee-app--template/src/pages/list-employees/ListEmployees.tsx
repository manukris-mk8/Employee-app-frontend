import { useNavigate, useSearchParams } from 'react-router-dom'
import { ListRowComponent } from '../../components/employee-list-row/ListRowComponent'
import './ListEmployees.css'
// import employeeDummy from '.././../constants/dummyData/employee-dummy.json'
import { type ChangeEvent } from 'react'
import { SpecialButton } from '../../components/button/SpecialButton'
// import store, { useAppSelector } from '../../store/store'
import { useGetEmployeesQuery } from '../../api-services/employees/employee.api'
import LoadingComponent from '../../components/loadingComponent/LoadingComponent'

const ListEmployees = () => {
    const navigate = useNavigate();

    const [selectedStatusParam, setSelectedStatusParam] = useSearchParams();
    const {data,isLoading} = useGetEmployeesQuery();
    // console.log("🚀 ~ ListEmployees ~ getEmployees:", getEmployees.data)
    
    // const data = employeeDummy;
    // const data = getEmployees.data

    // const data = store.getState().employee.employees
    // const data = useAppSelector((state) => state.employee.employees)

    const statusOptions = [
        { value: "ALL", label: "All" },
        { value: "ACTIVE", label: "Active" },
        { value: "INACTIVE", label: "Inactive" },
        { value: "PROBATION", label: "Probation" }
    ]

    const statuses = ['ALL', 'ACTIVE', 'INACTIVE', 'PROBATION']

    const selectedStatus = selectedStatusParam.get('status') || 'ALL';

    const handleSetSearchParams = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSearchParams = new URLSearchParams(selectedStatusParam);
        e.target.value === 'ALL' ? newSearchParams.delete('status') : newSearchParams.set("status", e.target.value)
        setSelectedStatusParam(newSearchParams)
    }

    if(isLoading) return <LoadingComponent/>

    return (
        <div className='main-div'>
            <div className='header'>
                <div>
                    <h1>Employee List</h1>
                </div>
                <div className='header-right'>
                    <span>Filter By</span>
                    <select
                        id='status'
                        className='status-selection'
                        // value={selectedStatus || 'ALL'}
                        defaultValue={''}
                        onChange={(e) => handleSetSearchParams(e)}
                    >
                        <option value="" disabled hidden>
                            Status
                        </option>
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>

                    <SpecialButton text={'Create Employee'} className={'create-emp-btn'} type={'button'} onClick={() => { navigate('create') }} />
                </div>

            </div>
            <div className='list-table-header'>
                <label>Employee Name</label>
                <label>Employee Id</label>
                <label>Joining Date</label>
                <label>Role</label>
                <label>Status</label>
                <label>Experience</label>
                <label>Action</label>
            </div>
            {selectedStatus === 'ALL' ||
                (!statuses.includes(selectedStatus)) ? (
                data?.map((employee) => (
                    <ListRowComponent
                        key={employee.employeeId}
                        employee={employee}
                    />
                ))
            ) : (
                data?.filter((emp) => emp.status === selectedStatus).map((employee) => (
                    <ListRowComponent
                        key={employee.employeeId}
                        employee={employee}
                    />
                ))
            )
            }
        </div>
    )
}

export default ListEmployees;