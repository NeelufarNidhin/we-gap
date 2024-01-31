export default interface apiResponse {
    data? : {
		[x: string]: any;
        statusCode? : number;
        isSuccess? : boolean;
        errorMessages?: string;
        result : {
           [ key : string]: string
        }
    };
    error? : any
}