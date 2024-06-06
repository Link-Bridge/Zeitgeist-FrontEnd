import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { Fragment } from 'react/jsx-runtime';
import { ExpenseReport } from '../../types/expense';

type ReportProps = {
  data: ExpenseReport;
};

const styles = StyleSheet.create({
  chipWrapper: { display: 'flex', flexDirection: 'column', fontSize: 14, gap: 2 },
  defaultChip: {
    backgroundColor: '#C4C4C4',
    padding: 5,
    borderRadius: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  goldChip: {
    backgroundColor: '#E8C273',
    padding: 5,
    borderRadius: 20,
    fontSize: 10,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

const tableStyle = StyleSheet.create({
  table: {
    margin: 25,
    padding: 5,
    backgroundColor: '#FBFCFE',
    borderRadius: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
  },
  tableBody: {},
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    paddingVertical: 10,
    borderBottom: '0.5px solid #000',
    minHeight: 0,
  },
  tableCol: {},
  tableCell: {
    textAlign: 'left',
    flexBasis: '20%',
    flexGrow: 0,
    paddingHorizontal: 2,
  },
});

const Report = ({ data }: ReportProps) => {
  return (
    <Document>
      <Page
        size='LETTER'
        style={{ fontFamily: 'Times-Bold', color: 'black', textAlign: 'justify' }}
      >
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 30,
            gap: '20px',
          }}
        >
          <Text>{data.title}</Text>
        </View>
        <View style={styles.divider} />
        <View
          style={{
            marginHorizontal: 30,
            gap: '20px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <View style={styles.chipWrapper}>
            <Text>Status</Text>
            <Text style={styles.defaultChip}>{data.status ?? 'NONE'}</Text>
          </View>
          <View style={styles.chipWrapper}>
            <Text>Total</Text>
            <Text style={styles.goldChip}>${data.totalAmount ?? 0}</Text>
          </View>
          <View style={styles.chipWrapper}>
            <Text>Name</Text>
            <Text style={styles.defaultChip}>
              {data.employeeFirstName?.split(' ')[0]} {data.employeeLastName?.split(' ')[0]}
            </Text>
          </View>
          <View style={styles.chipWrapper}>
            <Text>Start Date</Text>
            <Text style={{ fontSize: 12, paddingTop: 5 }}>
              {dayjs.utc(data.startDate).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
      </Page>
      <Page
        size='LETTER'
        style={{ fontFamily: 'Times-Bold', color: 'black', textAlign: 'justify' }}
      >
        <View style={tableStyle.table}>
          <View style={tableStyle.tableHeader}>
            <View style={tableStyle.tableRow}>
              <Text style={{ ...tableStyle.tableCell, flexBasis: '33%' }}>Description</Text>
              <Text style={tableStyle.tableCell}>Date</Text>
              <Text style={tableStyle.tableCell}>Supplier</Text>
              <Text style={tableStyle.tableCell}>Invoice</Text>
              <Text style={tableStyle.tableCell}>Amount</Text>
            </View>
          </View>
          {data.expenses?.map((expense, index) => (
            <Fragment key={index}>
              <View style={tableStyle.tableBody}></View>
              <View key={index} style={tableStyle.tableRow}>
                <Text style={{ ...tableStyle.tableCell, flexBasis: '33%' }}>{expense.title}</Text>
                <Text style={tableStyle.tableCell}>
                  {dayjs.utc(expense.date).format('DD/MM/YYYY')}
                </Text>
                <Text style={tableStyle.tableCell}>
                  {expense.supplier ? expense.supplier : '-'}
                </Text>
                {expense.urlFile ? (
                  <Link style={tableStyle.tableCell} src={expense.urlFile ?? ''}>
                    File
                  </Link>
                ) : (
                  <Text style={tableStyle.tableCell}>-</Text>
                )}
                <Text style={tableStyle.tableCell}>${expense.totalAmount}</Text>
              </View>
            </Fragment>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Report;
