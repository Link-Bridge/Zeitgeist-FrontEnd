import { useEffect, useState } from "react";
import colors from "../../colors";
import { Report } from "../../types/project-report";
import { Response } from "../../types/reponse";
import useHttp from "../../hooks/useHttp";
import { RequestMethods, APIPath } from "../../utils/constants";
import StatusChip from "../../components/common/StatusChip"
import ColorChip from "../../components/common/ColorChip";
import { useParams } from "react-router-dom";

const ProjectReport: React.FC = () => {
    const { id } = useParams();
    const { data, loading, sendRequest, error } = useHttp<Response<Report>>(`${APIPath.PROJECT_REPORT}/${id}`, RequestMethods.GET);
    const [report, setReport] = useState<Report>();

    useEffect (() => {
      if (!data){
        sendRequest()
      }
      setReport(data?.data);
      
    }, [data]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error){
      return <div>Error al cargar el reporte-</div>
    }

    return (
      <main className='p-10 py-4'>
        {report? (
          <>
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
          </>
        ):  (
          <p>No se econtro el reporte</p>
        )}
        
        
      </main>
    );
  };
  
  export default ProjectReport;
  