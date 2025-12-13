import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import chapters from '../chapters';
import ChapterHero from '../components/Chapter/ChapterHero';
import ChapterNav from '../components/Chapter/ChapterNav';
import NotFound from './NotFound';

const ChapterPage = () => {
  const { slug } = useParams();
  const chapterIndex = chapters.findIndex((item) => item.slug === slug);
  const chapter = chapters[chapterIndex];

  const neighbors = useMemo(() => {
    return {
      prev: chapterIndex > 0 ? chapters[chapterIndex - 1] : null,
      next: chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null,
    };
  }, [chapterIndex]);

  if (!chapter) return <NotFound />;

  const ContentComponent = chapter.component;

  return (
    <div>
      <ChapterHero
        title={chapter.title}
        subtitle={chapter.subtitle}
        readingTime={chapter.readingTime}
        tags={chapter.tags}
      />
      <ContentComponent />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ChapterNav prev={neighbors.prev} next={neighbors.next} />
      </div>
    </div>
  );
};

export default ChapterPage;
