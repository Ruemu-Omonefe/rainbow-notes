interface Metadata {
  altText: string;
  duration: number;
  size: number;
  width: number;
  height: number;
}

interface IContentItem {
  content: string;
  type: string;
  metadata: Metadata;
}

export interface Notebook {
    _id: number | string;
    title: string;
    coverDesign: string;
    userId: string;
    numberOfPages: number;
    content: IContentItem[];
    isFavorite: boolean;
    isShared: boolean;
    sharedId?: string
}
