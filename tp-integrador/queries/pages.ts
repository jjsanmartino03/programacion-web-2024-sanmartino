import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Page} from "@/types/common";
import {toast} from "@/hooks/use-toast";

type PagesQueryParams = {
  keyword?: string
  public?: boolean
  tags?: string[]
}

export const usePagesQuery = (params: PagesQueryParams, defaultPages?: Page[]) => useQuery<Page[]>({
  queryKey: ['pages', params],
  initialData: defaultPages,
  queryFn: async () => {
    const response = await axios.get(`/api/pages`, {
      params: params
    });
    return response.data;
  }
});

const createPage = async (pageData: Omit<Page, 'slug' | 'shortId' | 'userId' | '_id'>): Promise<unknown> => {
  const response = await axios.post('/api/pages', pageData);
  return response.data;
};

export const useCreatePageMutation = () => useMutation({
  mutationFn: createPage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Su página ha sido creada.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Error al crear la página. Inténtelo nuevamente.",
      variant: "destructive",
    });
  },
});

const updatePage = async (pageData: Omit<Page, 'slug' | 'shortId' | 'userId'>): Promise<unknown> => {
  const response = await axios.put(`/api/pages/${pageData._id}`, pageData);
  return response.data;
};

export const useUpdatePageMutation = () => useMutation({
  mutationFn: updatePage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Su página ha sido actualizada.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Error al actualizar la página. Inténtelo nuevamente.",
      variant: "destructive",
    });
  },
});

const deletePage = async (id: string): Promise<unknown> => {
  const response = await axios.delete(`/api/pages/${id}`);
  return response.data;
};

export const useDeletePageMutation = () => useMutation({
  mutationFn: deletePage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Página eliminada con éxito.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Error al eliminar la página. Inténtelo nuevamente.",
      variant: "destructive",
    });
  },
});