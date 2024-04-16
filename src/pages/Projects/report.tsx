import { useEffect, useState } from "react";
import colors from "../../colors";
import { Report } from "../../types/project-report";
import { Response } from "../../types/response";
import { getReport } from "../../services/project-report.service";
import StatusChip from "../../components/common/StatusChip"
import ColorChip from "../../components/common/ColorChip";
import { useParams } from "react-router-dom";

const ProjectReport = () => {
    const [report, setReport] = useState<Report>();
    const { id } = useParams();

    const getReportController = (): void => {
        const doFetch = async(): Promise<void> => {
          if (id === undefined || id === null) {
            throw new Error('Project id not defined');
          }
          const data: Response<Report> = await getReport(id);
          setReport(data.data);
        }

        void doFetch();
    }

    useEffect (() => {
        getReportController();
    }, []);

    return (
      <main className='p-10 py-4'>
        <h1>Project Report</h1> 
        <p>{ new Date().toLocaleString() }</p>

        <h2>{report?.project.name}</h2>
        <p>{report?.project.description}</p>
        <div className='p-10 py-4 flex'>
          <StatusChip status = {`${report?.project.status || '-'}`}/>
          <ColorChip label = {`${report?.project.totalHours}`} color={`${colors.extra}`}></ColorChip>
          <ColorChip label = {`${report?.project.totalHours}`} color={`${colors.null}`}></ColorChip>
        </div>

        <div className='p-10 py-4 flex'>
          <div>
            <p>Matter</p>
            <ColorChip label = {`${report?.project.matter}`} color={`${colors.null}`}></ColorChip>
          </div>

          <div>
            <p>Category</p>
            <ColorChip label = {`${report?.project.category}`} color={`${colors.null}`}></ColorChip>
          </div>

          <div>
            <p>Chargeable</p>
            <ColorChip label = {`${report?.project.isChargeable}`? 'YES' : 'NO'} color={`${colors.null}`}></ColorChip>
          </div>

        </div>

        <div className='p-10 py-4 flex'>
        <div>
            {
              report?.project.startDate &&
              <>
                <p>Start Date</p>
                <p>{report?.project.startDate.toString() || ''}</p>
              </>
            }
          </div>
        </div>
        
      </main>
    );
  };
  
  export default ProjectReport;
  