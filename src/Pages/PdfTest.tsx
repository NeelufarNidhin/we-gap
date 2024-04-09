import React from 'react'

import { Page, Text,Document,StyleSheet } from '@react-pdf/renderer'
import {  useGetEmployeeExistsQuery } from '../API/employeeApi'
import userModel from '../Interfaces/userModel'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({})
const PdfTest = () => {
  const userData: userModel = useSelector((state: any) => state.userAuthStore);
    const {data,isLoading,error, isSuccess} = useGetEmployeeExistsQuery(userData.id)
   
  return (
   
   <Document>
     {isLoading && <p>..Loading </p>}
     {error && <p> something went wrong</p>}
     {isSuccess && (
       
        <Page>
          <Text>Name: userData.firstName {userData.lastName}</Text>
          <Text>Email : {userData.email}</Text>
        <Text>City: data.city</Text>
        <Text>State:{data.state}</Text>
        <Text>Bio: {data.bio}</Text>
        <Text> THis is my attempt to create a pdf viewer</Text>
        <Text> THis is my attempt to create a pdf viewer</Text>
        {/* <Text>
            render = {({ pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
        </Text> */}
    </Page>
     )} 
    
   </Document>
  )
}

export default PdfTest
