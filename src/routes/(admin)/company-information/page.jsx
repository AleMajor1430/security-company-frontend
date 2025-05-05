import React, { useEffect, useState } from "react";
import CompanyInformationTable from "../../../components/CompanyInformation/CompanyInformationTable";
import { getAllCompanyInformation } from "../../../services/companyInformationApi";
import GeneralStatCards from "../../../components/general/GeneralStatCards";
import { Building2, ShieldCheck, Clock, XCircle } from "lucide-react";

export default function CompanyInformationPage() {
    const [infoCount, setInfoCount] = useState(0);
    const [verifiedCount, setVerifiedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [unsubmittedCount, setUnsubmittedCount] = useState(0); // Optional, for edge cases

    useEffect(() => {
        const fetchCompanyInfos = async () => {
            try {
                const response = await getAllCompanyInformation();
                if (response && response.data) {
                    const infos = response.data;
                    setInfoCount(infos.length);
                    setVerifiedCount(infos.filter(info => info.verified === true).length);
                    setPendingCount(infos.filter(info => info.verified === false).length);
                    setUnsubmittedCount(
                        infos.filter(info => !info.traders_license && !info.insurance && !info.tax_clearance).length
                    );
                }
            } catch (error) {
                console.error("Error fetching company information:", error);
            }
        };

        fetchCompanyInfos();
    }, []);

    const stats = [
        {
            title: "Total Info Records",
            value: infoCount,
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
            <CompanyInformationTable />
        </div>
    );
}
