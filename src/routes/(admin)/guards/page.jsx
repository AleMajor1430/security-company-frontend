import React, { useEffect, useState } from 'react';
import GuardsTable from '../../../components/Guards/GuardsTable';
import { getAllGuards } from "../../../services/guardsApi";
import GeneralStatCards from "../../../components/general/GeneralStatCards";
import { UserCheck, Clock, CheckCircle, XCircle, UserPlus } from 'lucide-react';

export default function Guards() {
    const [guardCount, setGuardCount] = useState(0);
    const [activeGuards, setActiveGuards] = useState(0);
    const [inactiveGuards, setInactiveGuards] = useState(0);
    const [suspendedGuards, setSuspendedGuards] = useState(0);

    useEffect(() => {
        const fetchGuards = async () => {
            try {
                const response = await getAllGuards();
                if (response && response.data) {
                    setGuardCount(response.data.length);
                    setActiveGuards(response.data.filter(guard => guard.status === "Active").length);
                    setInactiveGuards(response.data.filter(guard => guard.status === "Inactive").length);
                    setSuspendedGuards(response.data.filter(guard => guard.status === "Suspended").length);
                }
            } catch (error) {
                console.log("Error Fetching Guards: ", error);
            }
        };

        fetchGuards();
    }, []);

    const stats = [
        {
            title: "Total Guards",
            value: guardCount,
            percentage: "0%",
            icon: <UserCheck size={20} />
        },
        {
            title: "Active Guards",
            value: activeGuards,
            percentage: "0%",
            icon: <CheckCircle size={20} />
        },
        {
            title: "Inactive Guards",
            value: inactiveGuards,
            percentage: "0%",
            icon: <XCircle size={20} />
        },
        {
            title: "Suspended Guards",
            value: suspendedGuards,
            percentage: "0%",
            icon: <Clock size={20} />
        }
    ];

    return (
        <div className="space-y-6">
            <GeneralStatCards stats={stats} />
            <GuardsTable />
        </div>
    );
}