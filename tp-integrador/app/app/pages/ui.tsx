'use client'

import QRCodeModal from "@/components/qr/modal";
import {useCallback, useState} from "react";
import {Edit, QrCode, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Page, Tag} from "@/types/common";
import {usePagesQuery, useDeletePageMutation} from "@/queries/pages";
import {useRouter} from "next/navigation";
import ConfirmationModal from "@/components/modals/confirmation";
import {useTagsQuery} from "@/queries/tags";
import Link from "next/link";
import {pageLinks} from "@/utils/pages";


export default function UserPagesList({pages: pagesProp, tags: tagsProp}: { pages?: Page[], tags?: Tag[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [qrPageUrl, setQrPageUrl] = useState<{
    url: string, filename: string
  } | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');
  const {data: tags, isPending: tagsIsLoading} = useTagsQuery(tagsProp);
  const router = useRouter();
  const {data: pages, isPending: pagesIsLoading, refetch: refetchPages} = usePagesQuery({
    keyword: searchParam,
    public: false
  }, pagesProp);
  const {isPending: deleteIsPending, ...deleteMutation} = useDeletePageMutation();
  const isLoading = tagsIsLoading || pagesIsLoading;


  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = () => {
    setSearchParam(searchQuery);
  }

  const handleGetQR = (shortId: string, slug: string) => {
    setQrPageUrl({
      url: `${window.location.origin}${pageLinks.shortLinkPage(shortId)}`,
      filename: slug
    })
  };

  const getNameForTagId = useCallback((tagId: string) => {
    if (tags) {
      const tag = tags.find(t => t._id === tagId);
      return tag?.name;
    }
  }, [tags])

  const handleEdit = (id: string) => {
    router.push(pageLinks.editPage(id));
  };

  const handleDelete = (id: string) => {
    setPageToDelete(id);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      deleteMutation.mutate(pageToDelete, {
        onSuccess: async () => {
          setPageToDelete(null);
          await refetchPages();
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Páginas</h1>
      <div className="mb-6 grid grid-cols-3 md:grid-cols-12 items-center gap-2">
        <Input
          type="text"
          placeholder="Buscar páginas..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="col-span-2 md:col-span-8"
        />
        <Button onClick={onSearch}
                className={'md:col-span-2'}
                variant={'outline'}>
          Buscar
        </Button>
        <Button
          className="col-span-3 md:col-span-2"
          onClick={() => router.push(pageLinks.newPage)}
        >
          Crear página
        </Button>
      </div>
      {!isLoading && (pages?.length !== 0) && <Table>
          <TableHeader>
              <TableRow>
                  <TableHead className="md:w-[40%] w-[50%]">Título</TableHead>
                  <TableHead className="hidden md:table-cell w-[30%]">Etiquetas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {pages && tags && pages.map((page) => (
              <TableRow key={page._id}>
                <TableCell className="font-medium underline"><Link
                  href={pageLinks.shortLinkPage(page.shortId)}>{page.title}</Link></TableCell>
                <TableCell className={'hidden md:table-cell h-full align-middle'}>
                  <div className={'flex flex-wrap gap-1 items-center'}>{page.tags && page.tags.map(t => {
                    return <span className={'text-sm bg-green-200 rounded py-1 px-2'}
                                 key={t}>{getNameForTagId(t)}</span>
                  })}</div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleGetQR(page.shortId || '', page.slug || '')}
                    className="mr-2"
                  >
                    <QrCode className="h-4 w-4"/>
                    <span className="sr-only">Obtener QR</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(page._id)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4"/>
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(page._id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-700"/>
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      }
      {!isLoading && pages?.length === 0 &&
          <div className="flex justify-center items-center h-64">
              <p className="text-xl">No se encontraron páginas</p>
          </div>
      }
      <QRCodeModal
        filename={qrPageUrl?.filename}
        url={qrPageUrl?.url || ''}
        isOpen={!!qrPageUrl}
        onClose={() => setQrPageUrl(null)}
      />
      <ConfirmationModal
        loading={deleteIsPending}
        isOpen={!!pageToDelete}
        onClose={() => setPageToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Page"
        description="Are you sure you want to delete this page? This action cannot be undone."
      />
    </div>
  );
}