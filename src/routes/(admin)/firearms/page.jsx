import React, { useEffect, useState } from 'react'
import FireArmsTable from '../../../components/FireArms/FireArmsTable'
import { getAllFireArms } from "../../../services/fireArmsApi";
import GeneralStatCards from "../../../components/general/GeneralStatCards"
import { Warehouse, ShieldCheck, AlertTriangle, Skull, Hand } from 'lucide-react';

export default function FireArms() {
    const [fireArmCount, setFireArmCount] = useState(0);
    const [onHandFireArms, setOnHandFireArms] = useState(0);
    const [lostFireArms, setLostFireArms] = useState(0);
    const [stolenFireArms, setStolenFireArms] = useState(0);

    useEffect(() => {
        const fetchFireArms = async () => {
            try {
                const response = await getAllFireArms();
                if (response && response.data) {
                    setFireArmCount(response.data.length);
                    setOnHandFireArms(response.data.filter(fireArm => fireArm.status === "On Hand").length);
                    setLostFireArms(response.data.filter(fireArm => fireArm.status === "Lost").length);
                    setStolenFireArms(response.data.filter(fireArm => fireArm.status === "Stolen").length);
                }
            } catch (error) {
                console.log("Error Fetching FireArms: ", error);
            }
        };

        fetchFireArms();
    }, []);

    // Prepare stats data to pass to GeneralStatCards
    const stats = [
        {
            title: "Total FireArms",
            value: fireArmCount,
            percentage: "100%", // Represents all firearms
            icon: <Warehouse className="text-blue-500" size={20} />,
            color: 'bg-blue-50'
        },
        {
            title: "On Hand",
            value: onHandFireArms,
            percentage: fireArmCount > 0 ? `${Math.round((onHandFireArms / fireArmCount) * 100)}%` : "0%",
            icon: <ShieldCheck className="text-green-500" size={20} />,
            color: 'bg-green-50'
        },
        {
            title: "Lost",
            value: lostFireArms,
            percentage: fireArmCount > 0 ? `${Math.round((lostFireArms / fireArmCount) * 100)}%` : "0%",
            icon: <AlertTriangle className="text-yellow-500" size={20} />,
            color: 'bg-yellow-50'
        },
        {
            title: "Stolen",
            value: stolenFireArms,
            percentage: fireArmCount > 0 ? `${Math.round((stolenFireArms / fireArmCount) * 100)}%` : "0%",
            icon: <Skull className="text-red-500" size={20} />,
            color: 'bg-red-50'
        }
    ];

    return (
        <div className="space-y-6">
            <GeneralStatCards stats={stats} />
            <FireArmsTable />
        </div>
    )
}