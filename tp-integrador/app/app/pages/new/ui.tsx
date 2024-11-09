'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {toast} from "@/hooks/use-toast"
import {Loader2, ArrowLeft} from 'lucide-react'
import {useCreatePageMutation, useDeletePageMutation, useUpdatePageMutation} from "@/queries/pages"
import {Page} from "@/types/common"
import MarkdownEditor from '@/components/markdwon'
import ConfirmationModal from "@/components/modals/confirmation";
import TagSelector from '@/components/tags/selector';
import {pageLinks} from "@/utils/pages";

export default function PageForm({pageData}: { pageData?: Page }) {
  const [title, setTitle] = useState(pageData?.title || '');
  const [markdown, setMarkdown] = useState(pageData?.markdown || '');
  const [imageUrl, setImageUrl] = useState(pageData?.imageUrl || '');
  const [isPublic, setIsPublic] = useState(pageData?.isPublic || false);
  const [selectedTags, setSelectedTags] = useState<string[]>(pageData?.tags || []);
  const router = useRouter();
  const createMutation = useCreatePageMutation();
  const updateMutation = useUpdatePageMutation();
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const {isPending: deleteIsPending, ...deleteMutation} = useDeletePageMutation();

  const handleDelete = (id: string) => {
    setPageToDelete(id);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      deleteMutation.mutate(pageToDelete, {
        onSuccess: async () => {
          setPageToDelete(null);
          router.push(pageLinks.myPages);
        },
      });
    }
  };

  useEffect(() => {
    if (pageData) {
      setTitle(pageData.title);
      setMarkdown(pageData.markdown);
      setImageUrl(pageData.imageUrl);
      setIsPublic(pageData.isPublic);
      setSelectedTags(pageData.tags || []);
    }
  }, [pageData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !markdown) {
      toast({
        title: "Error",
        description: "El título y el contenido son requeridos",
        variant: "destructive",
      });
      return;
    }

    const pagePayload = {title, markdown, imageUrl, isPublic, tags: selectedTags};

    if (pageData?._id) {
      await updateMutation.mutateAsync({...pagePayload, _id: pageData._id});
    } else {
      await createMutation.mutateAsync(pagePayload);
    }

    router.push(pageLinks.myPages)
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'mqveikbd'); // Replace with your Cloudinary upload preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dyz4ycir1/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        setImageUrl(data.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
        toast({
          title: "Error",
          description: "Carga de imagen fallida. Inténtelo nuevamente.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">{pageData ? 'Actualizar Página' : 'Crear nueva página'}</h1>
      <p className="text-muted-foreground mb-8">Llena el formulario para {pageData ? 'actualizar' : 'crear'} tu página
        propia.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingrese el título"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="markdown">Contenido (Markdown)</Label>
          <MarkdownEditor
            value={markdown}
            onChange={setMarkdown}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Previsualización de imagen</Label>
          <Input
            id="image"
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 rounded-md max-w-full h-auto"/>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Etiquetas</Label>
          <TagSelector
            shouldCreateTag
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={setIsPublic}
          />
          <Label htmlFor="public">Publicar esta página en el feed</Label>
        </div>
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4"/> Back
          </Button>
          <div className={'flex gap-2'}>
            {pageData && <Button
                variant="destructive"
                type={'button'}
                onClick={() => handleDelete(pageData._id)}
            >
                <span>Eliminar</span>
            </Button>}
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  {pageData ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                pageData ? 'Actualizar' : 'Crear'
              )}
            </Button>
          </div>
        </div>
      </form>
      <ConfirmationModal
        loading={deleteIsPending}
        isOpen={!!pageToDelete}
        onClose={() => setPageToDelete(null)}
        onConfirm={confirmDelete}
        title="Eliminar página"
        description="¿Estas seguro de que quieres eliminar esta página?"
      />
    </div>
  );
}