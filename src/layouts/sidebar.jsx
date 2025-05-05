import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/coat-of-arms.png";
import logoDark from "../assets/coat-of-arms.png";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex gap-x-3 p-3">
                <img
                    src={logoLight}
                    alt="Logoipsum"
                    className="dark:hidden"
                    width={50}
                />
                <img
                    src={logoDark}
                    alt="Logoipsum"
                    className="hidden dark:block"
                    width={50}
                />
                {!collapsed && <p className="text-lg font-medium text-slate-900 transition-colors dark:text-slate-50">Logoipsum</p>}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((group) => (
                    <nav
                        key={group.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        <p className={cn("sidebar-group-title", collapsed && "md:w-[45px]")}>
                            {group.title}
                        </p>

                        {group.links.map((link) => (
                            <div key={link.label} className="w-full">
                                <NavLink
                                    to={link.path}
                                    className={cn("sidebar-item", collapsed && "md:w-[45px]")}
                                >
                                    {link.icon && (
                                        <link.icon size={22} className="flex-shrink-0" />
                                    )}
                                    {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                                </NavLink>

                                {/* Nested links */}
                                {!collapsed && link.children && (
                                    <div className="ml-6 mt-2 space-y-1">
                                        {link.children.map((child) => (
                                            <NavLink
                                                key={child.label}
                                                to={child.path}
                                                className="block text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                                            >
                                                • {child.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                ))}
            </div>
        </aside>
    );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
