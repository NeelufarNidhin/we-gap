export default interface jobModel{
    id: string,
    jobTitle : string,
    description:string,
    employerId:string,
    experience:string,
    salary:string,
    createdAt: string,
    jobSkills:Array<string>
    jobTypes:Array<string>

}