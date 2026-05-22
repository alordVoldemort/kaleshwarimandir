import './Article.css';
import { useAnnouncement } from '../../context/AnnouncementContext';

const Article = () => {
  const { announcement } = useAnnouncement();

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {announcement}
      </div>
    </div>
  );
};

export default Article;