import { CreditCard, DollarSign, Package, TrendingUp, Users } from "lucide-react";
import { getAllUsers } from "../services/usersApi";
import { getAllGuards } from "../services/guardsApi";
import { getAllCompanies } from "../services/companiesApi";
import { useEffect, useState } from "react";

const StatsCards = () => {
    const [userCount, setUserCount] = useState(0);
    const [guardCount, setGuardCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [pendingCompanies, setPendingCompanies] = useState(0);
    useEffect(() => {
        const fetchUsersCount = async () => {
            try {
                const response = await getAllUsers();
                if (response && response.data) {
                    setUserCount(response.data.length);
                }
            } catch (error) {
                console.error("Error fetching users count:", error);
            }
        };

        const fetchGuardCount = async () => {
            try {
                const response = await getAllGuards();
                if (response && response.data) {
                    setGuardCount(response.data.length);
                }
            } catch (error) {
                console.log("Error Fetching Guards: ", error);
            }
        };

        const fetchCompanies = async () => {
            try {
                const response = await getAllCompanies();
                if (response && response.data) {
                    setCompanyCount(response.data.length);
                    setPendingCompanies(response.data.filter(company => company.status === "Pending").length);
                }
            } catch (error) {
                console.log("Error Fetching Companies: ", error);
            }
        };

        fetchUsersCount();
        fetchGuardCount();
        fetchCompanies();
    }, []); // Added empty dependency array to run only once

    const stats = [
        {
            icon: <Package size={26} />,
            title: "Total Companies",
            value: companyCount,
            percentage: `${Math.round((companyCount / (companyCount + 100)) * 100)}%`, // Example calculation
        },
        {
            icon: <DollarSign size={26} />,
            title: "Pending Companies",
            value: pendingCompanies,
            percentage: `${Math.round((pendingCompanies / companyCount) * 100)}%`,
        },
        {
            icon: <Users size={26} />,
            title: "Total Users",
            value: userCount,
            percentage: `${Math.round((userCount / (userCount + 100)) * 100)}%`, // Example calculation
        },
        {
            icon: <CreditCard size={26} />,
            title: "Total Guards",
            value: guardCount,
            percentage: `${Math.round((guardCount / (guardCount + 100)) * 100)}%`, // Example calculation
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="card border rounded-lg overflow-hidden shadow-sm"
                >
                    <div className="card-header flex items-center justify-between">
                        <div className="rounded-lg bg-blue-500/20 p-2 text-blue-500 dark:bg-blue-600/20 dark:text-blue-600">
                            {stat.icon}
                        </div>
                        <p className="card-title text-sm font-medium text-gray-500">{stat.title}</p>
                    </div>
                    <div className="card-body bg-slate-100 dark:bg-slate-950 p-4">
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                            {stat.value.toLocaleString()} {/* Format numbers with commas */}
                        </p>
                        <span className="inline-flex items-center text-sm font-medium text-blue-500 dark:text-blue-600">
                            <TrendingUp size={18} />
                            {stat.percentage}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;