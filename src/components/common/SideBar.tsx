import React from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../colors';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import HomeIcon from '../../assets/icons/homeIcon.svg';
import ProjectsIcon from '../../assets/icons/view_module.svg';
import TasksIcon from '../../assets/icons/list.svg';
import ClientsIcon from '../../assets/icons/folder_shared.svg';
import EmployeesIcon from '../../assets/icons/groups_black.svg';

type Props = {};

const Items = [
    { icon: HomeIcon, href: "/", title: "Home Page" },
    { icon: ProjectsIcon, href: "/projects", title: "Projects" },
    { icon: TasksIcon, href: "/tasks", title: "Tasks" },
    { icon: ClientsIcon, href: "/clients", title: "Clients" },
    { icon: EmployeesIcon, href: "/employees", title: "Employees" }, // You may need to import EmployeesIcon accordingly
];

const SideBar = (props: Props) => {
    return (
        <aside className="bg-[#424242] h-screen flex flex-col items-center pt-16 gap-10 w-[246px]">
            <img src={LogoZeitgeist} alt="Zeitgeist Logo" className="w-16 mb-10" />
            <nav>
                <ul>
                    {Items.map(item => (
                        <li key={item.href} className="first:mt-0 my-16 text-base font-semibold">
                            <Link to={item.href} className="flex items-center gap-5" style={{ color: Colors.lightGold }}>
                                <img alt={`${item.title} icon`} src={item.icon} className="w-8" />
                                <p>{item.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
