import SideBar from "./SideBar";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({children}:LayoutProps) => {
    return (
        <main className="flex">
            <SideBar />
            <section className="flex-1">
                {children}
            </section>
        </main>
    );
};

export default Layout;
