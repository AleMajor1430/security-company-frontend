import React, { useEffect, useState} from 'react'
import CompaniesTable from '../../../components/Companies/CompaniesTable'
import { getAllCompanies } from "../../../services/companiesApi";
import GeneralStatCards from "../../../components/general/GeneralStatCards"
import { Building2, Clock, CheckCircle, XCircle } from 'lucide-react'; 

export default function Companies() {
    const [companyCount, setCompanyCount] = useState(0);
    const [pendingCompanies, setPendingCompanies] = useState(0);
    const [approvedCompanies, setApprovedCompanies] = useState(0);
    const [declinedCompanies, setDeclinedCompanies] = useState(0);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                if (response && response.data) {
                    setCompanyCount(response.data.length);
                    setPendingCompanies(response.data.filter(company => company.status === "Pending").length);
                    setApprovedCompanies(response.data.filter(company => company.status === "Approved").length);
                    setDeclinedCompanies(response.data.filter(company => company.status === "Declined").length);
                }
            } catch (error) {
                console.log("Error Fetching Companies: ", error);
            }
        };

        fetchCompanies();
    }, []); // Don't forget the dependency array

    // Prepare stats data to pass to GeneralStatCards
    const stats = [
        {
            title: "Total Companies",
            value: companyCount,
            percentage: "0%", // You can calculate this if you have previous data
            icon: <Building2 size={20} /> // Replace with appropriate icon
        },
        {
            title: "Pending Companies",
            value: pendingCompanies,
            percentage: "0%",
            icon: <Clock size={20} /> // Replace with appropriate icon
        },
        {
            title: "Approved Companies",
            value: approvedCompanies,
            percentage: "0%",
            icon: <CheckCircle size={20} /> // Replace with appropriate icon
        },
        {
            title: "Declined Companies",
            value: declinedCompanies,
            percentage: "0%",
            icon: <XCircle size={20} /> // Replace with appropriate icon
        }
    ];

    return (
        <div>
            <GeneralStatCards stats={stats} />
            <CompaniesTable />
        </div>
    )
}
