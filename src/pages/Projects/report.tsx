import { useEffect } from "react";
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

    useEffect (() => {
      if (!data){
        sendRequest()
      }
      
    }, [data]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error){
      return <div>Error al cargar el reporte-</div>
    }

    return (
      <main className='p-10 py-4'>


        {data?.data? (
          <>
            <h1>Project Report</h1> 
            <p>{ new Date().toLocaleString() }</p>
    
            <h2>{data?.data.project.name}</h2>
            <p>{data?.data.project.description}</p>
            <div className='p-10 py-4 flex'>
              <StatusChip status = {`${data?.data.project.status || '-'}`}/>
              <ColorChip label = {`${data?.data.project.totalHours}`} color={`${colors.extra}`}></ColorChip>
              <ColorChip label = {`${data?.data.project.totalHours}`} color={`${colors.null}`}></ColorChip>
            </div>
    
            <div className='p-10 py-4 flex'>
              <div>
                <p>Matter</p>
                <ColorChip label = {data?.data.project.matter || ""} color={`${colors.null}`}></ColorChip>
              </div>
    
              <div>
                <p>Category</p>
                <ColorChip label = {data?.data.project.category || "" } color={`${colors.null}`}></ColorChip>
              </div>
    
              <div>
                <p>Chargeable</p>
                <ColorChip label = {`${data?.data.project.isChargeable}`? 'YES' : 'NO'} color={`${colors.null}`}></ColorChip>
              </div>
    
            </div>
    
            <div className='p-10 py-4 flex'>
            <div>
                {
                  data?.data.project.startDate &&
                  <>
                    <p>Start Date</p>
                    <p>{data?.data.project.startDate.toString() || ''}</p>
                  </>
                }
              </div>
            </div>
          </>
        ):  (
          <p>No se encontró el reporte</p>
        )}
        
        
      </main>
    );
  };
  
  export default ProjectReport;
  