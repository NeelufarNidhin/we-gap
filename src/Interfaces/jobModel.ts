export default interface jobModel{
    id: string,
    jobTitle : string,
    description:string,
    employerId:string,
    experience:string,
    salary:number,
    jobSkills:Array<string>
    jobTypes:Array<string>

}