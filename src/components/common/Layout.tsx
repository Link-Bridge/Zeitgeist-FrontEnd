import SideBar from "./SideBar";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({children}:LayoutProps) => {
    return (
        <main className="flex flex-col">
            <SideBar />
            <section className="flex-1 pl-[243px]">
                {children}
            </section>
        </main>
    );
};

export default Layout;
