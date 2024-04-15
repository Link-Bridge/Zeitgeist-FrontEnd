import { useEffect, useState } from "react";
import { Report } from "../../types/project-report";
import { getReport } from "../../services/project-report.service";
import { useSearchParams } from "react-router-dom";

const ProjectReport = () => {
    const [report, setReport] = useState<Report>();
    const [searchParams] = useSearchParams();

    const getReportController = (): void => {
        const doFetch = async(): Promise<void> => {
            const data: Report = await getReport(searchParams.get('id') || 'fb6bde87-5890-4cf7-978b-8daa13f105f7');

            setReport(data);
        }

        void doFetch();
    }

    useEffect (() => {
        getReportController();
    }, []);

    return (
      <main className='p-10 py-4 flex gap-4'>
        <h1>Project Report</h1>
        <p>{new Date().getDate().toLocaleString()}</p>
        <p>{report?.project.name}</p>

      </main>
    );
  };
  
  export default ProjectReport;
  