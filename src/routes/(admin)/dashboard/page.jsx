import { Footer } from "../../../layouts/footer";
import OverviewChart from "../../../components/ChartOverview";
import RecentSales from "../../../components/RecentSales";
import TopOrders from "../../../components/TopOrders";
import StatsCards from "../../../components/StatsCard";

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Dashboard</h1>

            {/* Stats Cards */}
            <StatsCards />

            {/* Overview & Recent Sales */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                <OverviewChart />
                <RecentSales />
            </div>

            {/* Top Orders Table */}
            <TopOrders />

            <Footer />
        </div>
    );
};

export default DashboardPage;
