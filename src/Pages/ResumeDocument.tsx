
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const ResumeDocument = ({content } : any) => (
  <Document>
    <Page  style={styles.page}>
      <View style={styles.section}>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;


