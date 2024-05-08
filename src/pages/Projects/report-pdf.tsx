import { Document, Page, Text, View } from '@react-pdf/renderer';
import colors from '../../colors';
import { Report } from '../../types/project-report';

interface reportProps {
  data: Report;
}

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}-${month}-${year}`;
}

function statusColor(status: string) {
  status = status.toUpperCase();

  switch (status) {
    case 'ACCEPTED':
      return colors.lightSuccess;
    case 'NOT STARTED':
      return colors.lightRed;
    case 'IN PROGRESS':
      return colors.warning;
    case 'IN PROCESS':
      return colors.warning;
    case 'UNDER REVISION':
      return colors.purple;
    case 'DELAYED':
      return colors.lightOrange;
    case 'POSTPONED':
      return colors.blue;
    case 'DONE':
      return colors.success;
    case 'CANCELLED':
      return colors.warning;
    case 'IN QUOTATION':
      return colors.darkBlue;
    case 'AREA':
      return colors.extra;
    default:
      return colors.null;
  }
}

function infoComponent(title: string, value: string, style: string = '-') {
  return (
    <View>
      <Text style={{ fontSize: 9 }}>{title}</Text>
      <View
        style={{
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: `${statusColor(style)}`,
        }}
      >
        <Text
          style={{
            paddingLeft: '15px',
            paddingRight: '15px',
            paddingTop: '3px',
            paddingBottom: '3px',
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const ProjectReportPDF = (props: reportProps) => {
  let tasks: number = -1;
  const totalTasks: number = Number(props.data?.statistics?.total) || 1;
  const keyMap = new Map<string, string>([
    ['done', 'Done'],
    ['inprogress', 'In process'],
    ['underrevision', 'Under Revision'],
    ['delayed', 'Delayed'],
    ['postponed', 'Postponed'],
    ['notstarted', 'Not started'],
    ['cancelled', 'Cancelled'],
  ]);

  return (
    <Document>
      <Page size='A4' style={{ backgroundColor: 'white' }}>
        <View style={{ color: 'black', textAlign: 'justify', margin: 30, gap: '20px' }}>
          <Text style={{ textAlign: 'center', fontSize: 26, fontFamily: 'Times-Bold' }}>
            {props.data.project.name}
          </Text>
          {props.data.project.description && (
            <Text style={{ fontSize: 14 }}>{props.data.project.description}</Text>
          )}

          <View style={{ gap: '20px' }}>
            <View
              style={{
                gap: '20px',
                fontSize: 14,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              {infoComponent(
                'Status',
                `${props.data.project.status}`,
                `${props.data.project.status}`
              )}
              {props.data.project.totalHours &&
                infoComponent('Total hours', `${props.data.project.totalHours}`)}
              {infoComponent('Company', `${props.data.project.companyName}`)}
            </View>

            <View
              style={{
                gap: '20px',
                fontSize: 14,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              {props.data.project.area &&
                infoComponent('Area', `${props.data.project.area}`, 'AREA')}
              {props.data.project.matter && infoComponent('Matter', `${props.data.project.matter}`)}
              {infoComponent('Category', `${props.data.project.category}`)}
              {props.data.project.isChargeable &&
                infoComponent('Chargeable', `${props.data.project.isChargeable ? 'Yes' : 'No'}`)}
            </View>

            <View style={{ fontSize: 14, gap: '20px', display: 'flex', flexDirection: 'row' }}>
              <View>
                <Text style={{ fontSize: 10 }}>Start Date</Text>
                <Text>{dateParser(props.data.project.startDate)}</Text>
              </View>

              {props.data.project.endDate && (
                <View>
                  <Text style={{ fontSize: 10 }}>End Date</Text>
                  <Text>{dateParser(props.data.project.endDate)}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={{ color: 'black', textAlign: 'justify', margin: 30, gap: '10px' }}>
          <Text style={{ textAlign: 'center', fontSize: 26, fontFamily: 'Times-Bold' }}>
            Tasks status
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 250,
              padding: 8,
              fontSize: 12,
              backgroundColor: colors.lighterGray,
              borderRadius: '10px',
            }}
          >
            {props.data.statistics &&
              Object.entries(props.data.statistics)
                .filter(([key]) => key !== 'total')
                .map(([item, value]) => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}
                      key={item}
                    >
                      <Text style={{ width: '20%' }}>{keyMap.get(item)}</Text>

                      <View
                        style={{ width: '50%', backgroundColor: colors.null, borderRadius: '10px' }}
                      >
                        <View
                          style={{
                            width: `${Math.round((value * 100) / totalTasks)}%`,
                            backgroundColor: colors.gold,
                            borderRadius: '10px',
                          }}
                        >
                          <Text>&nbsp;</Text>
                        </View>
                      </View>

                      <Text>{`${Math.round((value * 100) / totalTasks)}%`}</Text>
                    </View>
                  );
                })}
          </View>
        </View>
      </Page>

      <Page size='A4' style={{ backgroundColor: 'white' }}>
        {props.data.tasks?.map(item => {
          tasks++;
          return (
            <View
              style={{ color: 'black', textAlign: 'justify', margin: 30, gap: '30px' }}
              key={item.title}
            >
              <View style={{ gap: '10px' }}>
                {tasks % 4 == 0 && (
                  <Text break style={{ fontSize: 20 }}>
                    {item.title}
                  </Text>
                )}
                {tasks % 4 != 0 && <Text style={{ fontSize: 20 }}>{item.title}</Text>}
                <Text style={{ fontSize: 14 }}>{item.description}</Text>

                <View
                  style={{
                    gap: '20px',
                    fontSize: 14,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}
                >
                  {infoComponent('Status', `${item.status}`, `${item.status}`)}
                  {item.workedHours && infoComponent('Total hours', `${item.workedHours}`, 'extra')}
                  {item.employeeFirstName &&
                    item.employeeLastName &&
                    infoComponent(
                      'Responsible',
                      `${item.employeeFirstName} ${item.employeeLastName}`
                    )}
                  {item.waitingFor && infoComponent('Waiting For', `${item.waitingFor}`)}
                </View>

                <View style={{ fontSize: 14, gap: '20px', display: 'flex', flexDirection: 'row' }}>
                  <View>
                    <Text style={{ fontSize: 10 }}>Start Date</Text>
                    <Text>{dateParser(item.startDate)}</Text>
                  </View>

                  {item.endDate && (
                    <View>
                      <Text style={{ fontSize: 10 }}>End Date</Text>
                      <Text>{dateParser(item.endDate)}</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default ProjectReportPDF;
