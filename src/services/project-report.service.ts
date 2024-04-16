import { EnvKeysValues , APIPath, RequestMethods } from '../utils/constants';
import { Report } from '../types/project-report';
import useHttp from '../hooks/useHttp'
import { Response } from '../types/response';

export const getReport = async(id: string): Promise<Response<Report>> => {
    try {    
        const { data, error, loading, sendRequest } = useHttp<Response<Report>>(`${APIPath.PROJECT_REPORT}/${id}`, RequestMethods.GET);
        
        console.log(data);
        if (!data) {
            throw new Error('No report data')
        }

        return data;
    } catch (error: unknown) {
        console.error('Error: ', error);
        throw new Error('An unexpected error ocurred');
    }

};
