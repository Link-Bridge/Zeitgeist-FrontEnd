import { Document, Page, Text, View } from "@react-pdf/renderer";

interface reportProps {
  html: string
}

const ProjectReportPDF = (props: reportProps) => {
  return(
    <Document>
      <Page>
        <Text>
          {props.html}
        </Text>
      </Page>
    </Document>
  );
}

export default ProjectReportPDF;