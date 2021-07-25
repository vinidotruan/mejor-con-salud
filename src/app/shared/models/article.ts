export class Article {
  public id: number;
  public slug: string;
  public link: string;
  public permalink: string;
  public headline: string;
  public excpert: string;
  public featured_media: {
    thumbnail: '';
    medium: '';
    medium_large: '';
    large: '';
    '1536x1536': '';
    '2048x2048': '';
    'big-size': '';
    'big-size_mobile': '';
    'mid-size': '';
    'mid-size_mobile': '';
    'web-stories-poster-portrait': '';
    'web-stories-poster-landscape': '';
    'web-stories-poster-square': '';
    'web-stories-publisher-logo': '';
    'web-stories-thumbnail': '';
  };
  public categories: Category[];
  public sponsor?: any;
  public published: string;
  public modified: string;
}

export class Category {
  public id: number;
  public name: string;
  public slug: string;
  public description: string;
  public link: string;
  public permalink: string;
}
