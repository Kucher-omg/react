export type FieldValidatorsType = (value: string) => string | undefined 

export const requiredField: FieldValidatorsType = (value) =>{
    if(value) return undefined;
    return 'Field required';
}

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {

    if(value.length > maxLength) return `Max length is ${maxLength} symbols`;
    
    return undefined;
}
