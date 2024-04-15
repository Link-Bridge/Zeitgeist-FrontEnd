import { EnvKeysValues , APIPath } from '../utils/constants';
import { Report } from '../types/project-report';

export const getReport = async(id: string): Promise<Report> => {
    try {
        const res = await fetch(`${EnvKeysValues.BASE_API_URL}${APIPath.PROJECT_REPORT}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        
        const data: Report = await res.json();
        
        if (!data) {
            throw new Error('No report data')
        }

        return data;
    } catch (error: unknown) {
        console.error('Error: ', error);
        throw new Error('An unexpected error ocurred');
    }

};
