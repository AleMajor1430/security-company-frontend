import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "../../hooks/use-click-outside";
import { Sidebar } from "../../layouts/sidebar";
import { Header } from "../../layouts/header";
import { cn } from "../../utils/cn";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/auth-context";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);
    const { currentUser, logout } = useAuth();
    const sidebarRef = useRef(null);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    return (
        <div className="min-h-screen bg-slate-100 transition-colors dark:bg-slate-950">
            <div className={cn(
                "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
                !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
            )} />
            <Sidebar ref={sidebarRef} collapsed={collapsed} />
            <div className={cn("transition-[margin] duration-300", collapsed ? "md:ml-[70px]" : "md:ml-[240px]")}>
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    user={currentUser}
                    onLogout={logout}
                />
                <div className="h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;