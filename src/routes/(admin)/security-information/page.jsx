import React, { useEffect, useState } from "react";
import { getAllGuardsInformation } from "../../../services/guardsInformationApi";
import SecurityInformationTable from "../../../components/Guards/SecurityGuardInformationTable";
import GeneralStatCards from "../../../components/general/GeneralStatCards";
import { Building2, ShieldCheck, Clock, XCircle } from "lucide-react";

export default function SecurityCompanyInformationPage() {
    const [companyCount, setCompanyCount] = useState(0);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [unsubmittedCount, setUnsubmittedCount] = useState(0); // Optional

    useEffect(() => {
        const fetchSecurityCompanies = async () => {
            try {
                const response = await getAllGuardsInformation();
                if (response && response.data) {
                    const companies = response.data;
                    setCompanyCount(companies.length);
                    setVerifiedCount(companies.filter(c => c.verified === true).length);
                    setPendingCount(companies.filter(c => c.verified === false).length);
                    setUnsubmittedCount(
                        companies.filter(c => !c.traders_license && !c.insurance && !c.tax_clearance).length
                    );
                }
            } catch (error) {
                console.error("Error fetching security company information:", error);
            }
        };

        fetchSecurityCompanies();
    }, []);

    const stats = [
        {
            title: "Total Security Companies",
            value: companyCount,
            percentage: "0%",
            icon: <Building2 size={20} />
        },
        {
            title: "Verified Companies",
            value: verifiedCount,
            percentage: "0%",
            icon: <ShieldCheck size={20} />
        },
        {
            title: "Pending Verification",
            value: pendingCount,
            percentage: "0%",
            icon: <Clock size={20} />
        },
        {
            title: "Missing Documents",
            value: unsubmittedCount,
            percentage: "0%",
            icon: <XCircle size={20} />
        }
    ];

    return (
        <div>
            <GeneralStatCards stats={stats} />
            <SecurityInformationTable />
        </div>
    );
}
