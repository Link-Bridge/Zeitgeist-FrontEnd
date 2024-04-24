import { Document, Page, Text, View } from "@react-pdf/renderer";
import { Report } from "../../types/project-report";
import colors from "../../colors";

interface reportProps {
  data: Report
}

function dateParser (date: Date): string  {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0]; 
  return `${day}-${month}-${year}`;
}

function statusColor(status: string) {
  status = status.toUpperCase();

  switch (status) {
      case "ACCEPTED":
          return colors.lightSuccess;
      case "NOT STARTED":
          return colors.lightRed;
      case "IN PROGRESS":
          return colors.warning;
      case "UNDER REVISION":
          return colors.purple;
      case "DELAYED":
          return colors.lightOrange;
      case "POSTPONED":
          return colors.blue;
      case "DONE":
          return colors.success;
      case "CANCELLED":
          return colors.warning;
      case "IN QUOTATION":
          return colors.darkBlue
      default:
          return colors.null;
  }
}

function projectInfoComponent(title: string, value: string, style: string = "-") {
  return(
    <View>
      <Text style={{fontSize: 8}}>{title}</Text>
      <View style={{textAlign: "center", borderRadius: "10px", backgroundColor: `${statusColor(style)}`}}>
        <Text style={{paddingLeft: "15px", paddingRight: "15px", paddingTop: "3px", paddingBottom: "3px"}}>{value}</Text>
      </View>    
    </View>
  );
}

const ProjectReportPDF = (props: reportProps) => {
  const totalTasks: number = Number(props.data?.statistics?.total) || 1;
  const keyMap = new Map<string, string>([
    ['done', 'Done'],
    ['inprogress', 'In process'],
    ['underrevision', 'Under Revision'],
    ['delayed', 'Delayed'],
    ['postponed', 'Postponed'],
    ['notstarted', 'Not started'],
    ['cancelled', 'Cancelled']
  ]);

  return(
    <Document> 
      <Page size="A4" style={{ backgroundColor: 'white' }}>
        <View style={{ color: 'black', textAlign:"justify", margin: 30, gap: "20px"}}>
          <Text style={{textAlign:"center", fontSize: 26, fontFamily: "Times-Bold"}}>{props.data.project.name}</Text>
          <Text style={{fontSize: 14}}>{props.data.project.description}</Text> 

          <View style={{gap: "20px"}}>
            <View style={{ gap: "20px", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
              {projectInfoComponent("Status", `${props.data.project.status}`, `${props.data.project.status}`)}
              {projectInfoComponent("Total hours", `${props.data.project.totalHours}`)}
              {projectInfoComponent("Company", `${props.data.project.companyName}`)}
            </View>


            <View style={{ gap: "20px", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
              {projectInfoComponent("Area", `${props.data.project.area}`)}
              {projectInfoComponent("Matter", `${props.data.project.matter}`)}
              {projectInfoComponent("Category", `${props.data.project.category}`)}
              {projectInfoComponent("Chargeable", `${props.data.project.isChargeable? "Yes" : "No"}`)}
            </View>

            <View style={{ fontSize: 14, gap: "20px", display: "flex", flexDirection: "row" }}>
              <View>
                <Text style={{fontSize: 10}}>Start Date</Text>
                <Text>{dateParser(props.data.project.startDate)}</Text>  
              </View>

              {props.data.project.endDate && (
                <View>
                  <Text style={{fontSize: 10}}>End Date</Text>
                  <Text>{dateParser(props.data.project.endDate)}</Text>  
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={{ color: 'black', textAlign:"justify", margin: 30, gap: "10px"}}>
          <Text style={{textAlign:"center", fontSize: 26, fontFamily: "Times-Bold"}}>Tasks status</Text>
          
          <View style={{ gap: "10px", padding:8, fontSize: 12, backgroundColor: colors.lighterGray, borderRadius: "10px" }}>
            {props.data.statistics && (    
              Object.entries(props.data.statistics).filter(([key, _]) => key !== 'total').map(([item, value]) => {
                return (
                  <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around"  }}>
                    <Text style={{width: "20%"}}>{keyMap.get(item)}</Text>

                    <View style={{width: "50%", backgroundColor: colors.null, borderRadius: "10px" }}>
                      <View style={{width: `${Math.round(value * 100 / totalTasks)}%`, backgroundColor: colors.gold, borderRadius: "10px"}}>
                        <Text >&nbsp;</Text>
                      </View>
                    </View>

                    <Text >{`${Math.round(value * 100 / totalTasks)}%`}</Text>
                  </View>
            )}))}
          </View>
        </View>
      </Page>

      <Page size="A4" style={{ backgroundColor: 'white' }}>
        <View style={{ color: 'black', textAlign:"justify", margin: 30, gap: "30px"}}>
          {props.data.tasks?.map((item, _) => {
            return (
              <View style={{gap: "10px"}}>
                <Text style={{fontSize: 20}}>{item.title}</Text>
                <Text style={{fontSize: 14}}>{item.description}</Text>

                <View style={{ gap: "20px", fontSize: 14, display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                  {projectInfoComponent("Status", `${item.status}`, `${item.status}`)}
                  {projectInfoComponent("Total hours", `${item.workedHours}`, "extra")}
                  {projectInfoComponent("Employee", `${item.waitingFor}`)}
                </View>

                <View style={{ fontSize: 14, gap: "20px", display: "flex", flexDirection: "row" }}>
                  <View>
                    <Text style={{fontSize: 10}}>Start Date</Text>
                    <Text>{dateParser(item.startDate)}</Text>  
                  </View>

                  {item.endDate && (
                    <View>
                      <Text style={{fontSize: 10}}>End Date</Text>
                      <Text>{dateParser(item.endDate)}</Text>  
                    </View>
                  )}
                </View>
              </View>
          )
          })}
        </View>
      </Page>
    </Document>
  );
}

export default ProjectReportPDF;
