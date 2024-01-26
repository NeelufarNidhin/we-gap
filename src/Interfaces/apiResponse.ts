export default interface apiResponse {
    data? : {
		[x: string]: any;
        statusCode? : number;
        isSuccess? : boolean;
        errorMessages?: Array<string>;
        result : {
           [ key : string]: string
        }
    };
    error? : any
}