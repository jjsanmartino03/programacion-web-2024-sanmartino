import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Page} from "@/types/common";

export const usePagesQuery = (defaultPages?: Page[]) => useQuery<Page[]>({
  queryKey: ['pages'],
  initialData: defaultPages,
  queryFn: async () => {
    const response = await axios.get('/api/pages');
    return response.data;
  }
})