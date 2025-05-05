// import { useEffect, useState } from "react";
// import {
//     getAllEmployeeDetails,
//     createEmployeeDetails,
//     updateEmployeeDetails,
//     deleteEmployeeDetails,
// } from "../../services/employeeDetailsApi";
// import {
//     getAllEmployees,
// } from "../../services/employeeApi";
// import {
//     getAllDepartments,
// } from "../../services/departmentsApi";
// import {
//     getAllMinistries
// } from "../../services/ministriesApi";
// import { PencilLine, Trash, Plus } from "lucide-react";
// import EmployeeForm from "./EmployeeDetailsForm";


const EmployeeDetailsTable = () => {
    // const [employeeDetails, setEmployeeDetails] = useState([]);
    // const [employees, setEmployees] = useState([]);
    // const [departments, setDepartments] = useState([]);
    // const [ministries, setMinistries] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [showForm, setShowForm] = useState(false);
    // const [currentEmployeeDetail, setCurrentEmployeeDetail] = useState(null);
    // const [employeeDetailToDelete, setEmployeeDetailToDelete] = useState(null);

    // useEffect(() => {
    //     fetchAllData();
    // }, []);

    // const fetchAllData = async () => {
    //     try {
    //         setLoading(true);
    //         const [
    //             employeeDetailsRes,
    //             employeesRes,
    //             departmentsRes,
    //             ministriesRes
    //         ] = await Promise.all([
    //             getAllEmployeeDetails(),
    //             getAllEmployees(),
    //             getAllDepartments(),
    //             getAllMinistries()
    //         ]);

    //         setEmployeeDetails(employeeDetailsRes.data);
    //         setEmployees(employeesRes.data);
    //         setDepartments(departmentsRes.data);
    //         setMinistries(ministriesRes.data);
    //     } catch (error) {
    //         console.error("Failed to fetch data", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // const handleAddEmployeeDetail = () => {
    //     setCurrentEmployeeDetail(null);
    //     setShowForm(true);
    // };

    // const handleEditEmployeeDetail = (employeeDetail) => {
    //     setCurrentEmployeeDetail(employeeDetail);
    //     setShowForm(true);
    // };

    // const handleSubmit = async (data) => {
    //     try {
    //         if (currentEmployeeDetail) {
    //             await updateEmployeeDetails(currentEmployeeDetail._id, data);
    //         } else {
    //             await createEmployeeDetails(data);
    //         }
    //         fetchAllData();
    //         setShowForm(false);
    //     } catch (error) {
    //         console.error("Error saving employee details:", error);
    //     }
    // };

    // const confirmDelete = async () => {
    //     try {
    //         await deleteEmployeeDetails(employeeDetailToDelete);
    //         fetchAllData();
    //         setEmployeeDetailToDelete(null);
    //     } catch (error) {
    //         console.error("Error deleting employee details:", error);
    //     }
    // };

    // if (loading) return <div className="p-4">Loading...</div>;

    // return (
    //     <div className="rounded-2xl border shadow-sm bg-white">
    //         <div className="border-b px-6 py-4 flex justify-between items-center">
    //             <h2 className="text-lg font-semibold">Employee Details</h2>
    //             <button
    //                 onClick={handleAddEmployeeDetail}
    //                 className="btn btn-primary btn-sm flex items-center gap-1"
    //             >
    //                 <Plus size={16} />
    //                 Add Employee Details
    //             </button>
    //         </div>

    //         <div className="overflow-x-auto">
    //             <table className="min-w-full text-sm text-left">
    //                 <thead className="bg-slate-100 text-slate-700 uppercase text-xs sticky top-0 z-10">
    //                     <tr>
    //                         <th className="px-6 py-3">#</th>
    //                         <th className="px-6 py-3">Employee</th>
    //                         <th className="px-6 py-3">Employee No</th>
    //                         <th className="px-6 py-3">Grade</th>
    //                         <th className="px-6 py-3">Position</th>
    //                         <th className="px-6 py-3">Department</th>
    //                         <th className="px-6 py-3">Ministry</th>
    //                         <th className="px-6 py-3">Employment Date</th>
    //                         <th className="px-6 py-3">Warnings</th>
    //                         <th className="px-6 py-3">Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody className="divide-y">
    //                     {employeeDetails.map((detail, index) => {
    //                         // Directly access the populated data fields
    //                         const employee = detail.employee_id;  // Already populated
    //                         const department = detail.department_id;  // Already populated
    //                         const ministry = detail.ministry_id;  // Already populated

    //                         return (
    //                             <tr key={detail._id} className="hover:bg-slate-50">
    //                                 <td className="px-6 py-4">{index + 1}</td>
    //                                 <td className="px-6 py-4">
    //                                     {employee ? `${employee.first_name} ${employee.last_name}` : 'N/A'}
    //                                 </td>
    //                                 <td className="px-6 py-4">{detail.employee_number}</td>
    //                                 <td className="px-6 py-4">{detail.grade}</td>
    //                                 <td className="px-6 py-4">{detail.position}</td>
    //                                 <td className="px-6 py-4">
    //                                     {department ? department.department_name : 'N/A'}
    //                                 </td>
    //                                 <td className="px-6 py-4">
    //                                     {ministry ? ministry.ministry_name : 'N/A'}
    //                                 </td>
    //                                 <td className="px-6 py-4">
    //                                     {new Date(detail.date_of_employment).toLocaleDateString()}
    //                                 </td>
    //                                 <td className="px-6 py-4">
    //                                     {detail.has_warning ? (
    //                                         <span className="badge badge-warning">{detail.warning_count}</span>
    //                                     ) : (
    //                                         <span className="badge badge-success">0</span>
    //                                     )}
    //                                 </td>
    //                                 <td className="px-6 py-4">
    //                                     <div className="flex items-center gap-x-3">
    //                                         <button
    //                                             onClick={() => handleEditEmployeeDetail(detail)}
    //                                             className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
    //                                             title="Edit"
    //                                         >
    //                                             <PencilLine size={18} />
    //                                         </button>
    //                                         <button
    //                                             onClick={() => setEmployeeDetailToDelete(detail._id)}
    //                                             className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
    //                                             title="Delete"
    //                                         >
    //                                             <Trash size={18} />
    //                                         </button>
    //                                     </div>
    //                                 </td>
    //                             </tr>
    //                         );
    //                     })}
    //                 </tbody>

    //             </table>
    //         </div>

    //         {/* Form Modal */}
    //         {showForm && (
    //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    //                 <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
    //                     <div className="flex justify-between items-center mb-4">
    //                         <h3 className="text-lg font-semibold">
    //                             {currentEmployeeDetail ? "Edit Employee Details" : "Add Employee Details"}
    //                         </h3>
    //                         <button
    //                             onClick={() => setShowForm(false)}
    //                             className="btn btn-ghost btn-sm"
    //                         >
    //                             ✕
    //                         </button>
    //                     </div>
    //                     <EmployeeForm
    //                         onSubmit={handleSubmit}
    //                         initialData={currentEmployeeDetail}
    //                         onCancel={() => setShowForm(false)}
    //                         employees={employees}
    //                         departments={departments}
    //                         ministries={ministries}
    //                     />
    //                 </div>
    //             </div>
    //         )}

    //         {/* Delete Confirmation Modal */}
    //         {employeeDetailToDelete && (
    //             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    //                 <div className="bg-white rounded-xl p-6 w-full max-w-sm">
    //                     <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
    //                     <p className="mb-4">Are you sure you want to delete these employee details?</p>
    //                     <div className="flex justify-end gap-2">
    //                         <button
    //                             onClick={() => setEmployeeDetailToDelete(null)}
    //                             className="btn btn-sm"
    //                         >
    //                             Cancel
    //                         </button>
    //                         <button
    //                             onClick={confirmDelete}
    //                             className="btn btn-danger btn-sm"
    //                         >
    //                             Delete
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
};

export default EmployeeDetailsTable;
