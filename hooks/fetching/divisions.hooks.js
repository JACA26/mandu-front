import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createDivision, getDivisions } from "../../controllers/division.controller"


const KEY_DIVISIONS = "divisions"

export const useDivisions = (page, limit) => {
    return useQuery(
        [KEY_DIVISIONS],
        () => getDivisions(page, limit),
        {
            refetchOnWindowFocus: false,
            retry: 2,
        }
    )
}



export const useSelectDivision = () => {
    const { data, isLoading } = useDivisions(1, 1000);
    const select = data?.data?.map((division) => ({
        value: division.id,
        label: division.nombre,
    }));
    
    return [select, isLoading]
}


export const useMutateCreateDivision = () => {
    const queryClient = useQueryClient();
    return useMutation(
        createDivision,
        {
            onSuccess: () => {
                queryClient.invalidateQueries([KEY_DIVISIONS]);
            }
        }
    )
}