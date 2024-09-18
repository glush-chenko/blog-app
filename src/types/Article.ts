export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    likes: number;
    isLiked: boolean;
    dateCreated: number;
    imageUrl?: string | null;
}