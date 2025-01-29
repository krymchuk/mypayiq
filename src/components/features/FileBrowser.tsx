'use client';

import {
  File,
  FileText,
  Folder,
  Image as ImageIcon,
  MoreVertical,
  Download,
  Share2,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'document';
  size?: string;
  modifiedAt: string;
  icon?: React.ReactNode;
}

interface FileBrowserProps {
  files: FileItem[];
  onFileClick?: (file: FileItem) => void;
}

const getFileIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'folder':
      return <Folder className="h-5 w-5 text-[#7C5CFC]" />;
    case 'image':
      return <ImageIcon className="h-5 w-5 text-[#2ECC71]" />;
    case 'document':
      return <FileText className="h-5 w-5 text-[#FF4757]" />;
    default:
      return <File className="h-5 w-5 text-[#8395A7]" />;
  }
};

export function FileBrowser({ files, onFileClick }: FileBrowserProps) {
  return (
    <div className="rounded-lg border border-[#F1F2F6] bg-white">
      <div className="grid grid-cols-12 gap-4 border-b border-[#F1F2F6] p-4 text-sm font-medium text-[#8395A7]">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-3">Modified</div>
        <div className="col-span-1"></div>
      </div>
      <div className="divide-y divide-[#F1F2F6]">
        {files.map((file) => (
          <div
            key={file.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-[#F1F2F6]/50"
          >
            <div className="col-span-6">
              <button
                onClick={() => onFileClick?.(file)}
                className="flex items-center space-x-3"
              >
                {file.icon || getFileIcon(file.type)}
                <span className="font-medium text-black">{file.name}</span>
              </button>
            </div>
            <div className="col-span-2 text-sm text-[#8395A7]">
              {file.size || '-'}
            </div>
            <div className="col-span-3 text-sm text-[#8395A7]">
              {file.modifiedAt}
            </div>
            <div className="col-span-1">
              <div className="flex items-center justify-end space-x-2">
                {file.type !== 'folder' && (
                  <>
                    <button className="text-[#8395A7] hover:text-[#7C5CFC]">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="text-[#8395A7] hover:text-[#7C5CFC]">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </>
                )}
                <button className="text-[#8395A7] hover:text-[#7C5CFC]">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
