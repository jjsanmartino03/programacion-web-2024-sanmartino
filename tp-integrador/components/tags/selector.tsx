import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTagsQuery, useTagMutation } from '@/queries/tags';
import { Button } from '@/components/ui/button';
import { Tag } from '@/types/common';

type TagSelectorProps = {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  shouldCreateTag?: boolean;
};

export default function TagSelector({ selectedTags, onChange, shouldCreateTag }: TagSelectorProps) {
  const { data: tags, refetch: refetchTags } = useTagsQuery();
  const { mutate: createTag } = useTagMutation();
  const [query, setQuery] = useState('');

  const filteredTags =
    query === ''
      ? tags
      : tags?.filter((tag) =>
        tag.name.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (selectedTag: Tag | string) => {
    if (!selectedTag) return;
    if (typeof selectedTag === 'string') {
      // Create new tag
      createTag({ name: selectedTag }, {
        onSuccess: async (createdTag) => {
          await refetchTags();
          onChange([...selectedTags, createdTag.insertedId]);
        }
      });
    } else {
      // Select existing tag
      if (!selectedTags.includes(selectedTag._id)) {
        onChange([...selectedTags, selectedTag._id]);
        setQuery('')
      }
    }
  };

  const handleRemoveTag = (idToRemove: string) => {
    onChange(selectedTags.filter(id => id !== idToRemove));
  };

  return (
    <div className="space-y-4 flex flex-col justify-center">
      <Combobox onChange={handleSelect}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(tag: Tag) => tag?.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredTags?.map((tag) => (
              <Combobox.Option
                key={tag._id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                  }`
                }
                value={tag}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {tag.name}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? 'text-white' : 'text-teal-600'
                        }`}
                      >
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
            {shouldCreateTag && query !== '' && !filteredTags?.some(tag => tag.name.toLowerCase() === query.toLowerCase()) && (
              <Combobox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                  }`
                }
                value={query}
              >
                Create &quot;{query}&quot;
              </Combobox.Option>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(id => (
          <Button key={id} variant="destructive" onClick={() => handleRemoveTag(id)}>
            {tags && tags.find((t) => t._id === id)?.name} &times;
          </Button>
        ))}
      </div>
    </div>
  );
}