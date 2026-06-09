// TODO: Replace with Apollo (GraphQL)

export interface Video {
  id: number;
  created_at: string; // timestamp with time zone
  title: string;
  description: string | null;
  thumbnail: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  category: number | null;
  videoId: string;
  theme: string;
  publishedAt: string;
}

export const VideoConstants = Object.freeze({
  TABLE: 'Videos',
  ID: 'id',
  CREATED_AT: 'created_at',
  TITLE: 'title',
  DESCRIPTION: 'description',
  THUMBNAIL: 'thumbnail',
  CHANNEL_TITLE: 'channelTitle',
  VIEW_COUNT: 'viewCount',
  LIKE_COUNT: 'likeCount',
  COMMENT_COUNT: 'commentCount',
  CATEGORY: 'category',
  VIDEO_ID: 'videoId',
  THEME: 'theme',
});