'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { FileBrowser } from '@/components/features/FileBrowser';
import { Upload, Filter } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'document';
  size?: string;
  modifiedAt: string;
}

// This would typically come from an API
const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    modifiedAt: 'Feb 15, 2024',
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    modifiedAt: 'Feb 14, 2024',
  },
  {
    id: '3',
    name: 'invoice-february-2024.pdf',
    type: 'document',
    size: '2.5 MB',
    modifiedAt: 'Feb 13, 2024',
  },
  {
    id: '4',
    name: 'profile-picture.jpg',
    type: 'image',
    size: '1.2 MB',
    modifiedAt: 'Feb 12, 2024',
  },
  {
    id: '5',
    name: 'contract.docx',
    type: 'document',
    size: '856 KB',
    modifiedAt: 'Feb 10, 2024',
  },
];

export default function FilesPage() {
  const handleFileClick = (file: FileItem) => {
    console.log('File clicked:', file);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Files</h1>
            <p className="mt-1 text-sm text-[#8395A7]">
              Manage your documents and files
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-lg border border-[#F1F2F6] bg-white px-4 py-2 text-sm font-medium text-[#8395A7] hover:border-[#7C5CFC] hover:text-[#7C5CFC]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
          <FileBrowser files={mockFiles} onFileClick={handleFileClick} />
        </div>
      </div>
    </AppLayout>
  );
}
