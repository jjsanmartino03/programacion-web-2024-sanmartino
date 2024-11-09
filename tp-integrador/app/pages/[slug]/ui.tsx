import React from 'react';
import {Page} from "@/types/common";
import Image from "next/image";
import MarkdownRenderer from "@/components/markdwon/renderer";

type PageViewProps = {
  page: Page;
  author: { email: string };
};

const PageView: React.FC<PageViewProps> = ({page,author}) => {
  return (
    <div className={'w-full flex justify-center'}>
      <div className="container lg:w-2/3 xl:w-1/2  px-4 py-8">
        <h1 className="text-4xl font-bold mb-3">{page.title}</h1>
        <i className="text-muted-foreground mb-3">Created by {author.email}</i>
        {page.imageUrl && (
          <div className="flex justify-center mb-3">
            <Image src={page.imageUrl} alt={page.title} width={800} height={400} className="rounded-md shadow-md"/>
          </div>
        )}
        <MarkdownRenderer content={page.markdown}/>
      </div>
    </div>
  );
};

export default PageView;