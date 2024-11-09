'use client'

import {useState} from 'react'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Skeleton} from '@/components/ui/skeleton'
import {usePagesQuery} from "@/queries/pages";
import {useTagsQuery} from "@/queries/tags";
import {Button} from "@/components/ui/button";
import TagSelector from "@/components/tags/selector";
import Link from 'next/link';

export default function Feed() {
  const [searchParam, setSearchParam] = useState('');
  const {data: tags, isPending: isPendingTags} = useTagsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const {data: pages, isPending: isPendingPages} = usePagesQuery({
    public: true,
    keyword: searchParam,
    tags: selectedTags,
  });

  const loading = isPendingPages || isPendingTags;

  const onSearch = () => {
    setSearchParam(searchTerm);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Páginas</h1>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" "
        />
        <Button onClick={onSearch}>Buscar</Button>
      </div>

      <div className=" flex flex-col flex-wrap gap-2 items pl-0 p-4">
        <span>Etiquetas:</span>
        <TagSelector shouldCreateTag={false} selectedTags={selectedTags} onChange={setSelectedTags}/>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-2/3"/>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[200px] w-full mb-4"/>
                <Skeleton className="h-4 w-1/2"/>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-4 w-1/3"/>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages &&
            pages.map((page, index) => (
              <Link key={index} href={`/p/${page.shortId}`} passHref>

                <Card>
                  <CardHeader>
                    <CardTitle>{page.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {page.imageUrl && (
                      <img
                        src={page.imageUrl}
                        alt={page.title}
                        className="w-full h-48 object-cover mb-4 rounded-md"
                      />
                    )}
                    <p className="text-sm text-gray-500 mb-2">Created by: {page.authorEmail}</p>
                    {page.tags && (
                      <div className="flex flex-wrap gap-2">
                        {page.tags.map((tagId) => (
                          <Badge key={tagId} variant="secondary">
                            {tags && tags.find((t) => t._id === tagId)?.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      )}

      {!loading && pages && pages.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No pages found matching your criteria.</p>
      )}
    </div>
  );
}