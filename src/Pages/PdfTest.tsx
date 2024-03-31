import React from 'react'

import { Page, Text,Document,StyleSheet } from '@react-pdf/renderer'
import { useGetEmployeeByIdQuery } from '../API/employeeApi'

const styles = StyleSheet.create({})
const PdfTest = () => {
    //const {data,isLoading,error, isSuccess} = useGetEmployeeByIdQuery();
  return (
   
   <Document>
     {/* {isLoading && <p>..Loading </p>}
     {error && <p> something went wrong</p>}
     {isSuccess && ( */}
       
        <Page>
        {/* <Text>City:{data.city}</Text>
        <Text>State:{data.state}</Text>
        <Text>Bio: {data.bio}</Text> */}
        <Text> THis is my attempt to create a pdf viewer</Text>
        {/* <Text>
            render = {({ pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
        </Text> */}
    </Page>
     {/* )} */}
    
   </Document>
  )
}

export default PdfTest
