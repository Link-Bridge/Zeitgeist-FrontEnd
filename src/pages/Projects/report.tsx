import { useEffect, useState } from "react";
import { Report } from "../../types/project-report";
import { Response } from "../../types/response";
import { getReport } from "../../services/project-report.service";
import StatusChip from "../../components/common/StatusChip"
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


        {/*Nombre del proyecto
          Cliente
          Estatus
          Horas totales cotizadas
          Fecha de envío de cotización
        */}
        <p>{report?.project.name}</p>
        <StatusChip status = {`${report?.project.status || '-'}`}/>
      </main>
    );
  };
  
  export default ProjectReport;
  