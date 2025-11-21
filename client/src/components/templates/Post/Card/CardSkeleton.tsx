"use client";

import ContentLoader from "react-content-loader";

const PostCardSkeleton = () => {
  return (
    <div className="bg-stone-900 p-4 pt-3 rounded-xl">
      <ContentLoader
        speed={2}
        backgroundColor="#2a2a2a"
        foregroundColor="#3a3a3a"
        style={{ width: "100%", height: 400 }}
      >
        {/* Avatar */}
        <circle cx="25" cy="25" r="18" />

        {/* Topic name */}
        <rect x="55" y="10" rx="4" ry="4" width="120" height="12" />

        {/* Username + date */}
        <rect x="55" y="28" rx="4" ry="4" width="80" height="10" />
        <rect x="140" y="28" rx="4" ry="4" width="60" height="10" />

        {/* Title */}
        <rect x="0" y="60" rx="5" ry="5" width="70%" height="17" />

        {/* Media block */}
        <rect x="0" y="90" rx="6" ry="6" width="100%" height="230" />

        {/* Tags */}
        <rect x="0" y="84%" rx="6" ry="6" width="70" height="18" />
        <rect x="80" y="84%" rx="6" ry="6" width="60" height="18" />
        <rect x="150" y="84%" rx="6" ry="6" width="80" height="18" />

        {/* Footer buttons */}
        <rect x="0" y="93%" rx="6" ry="6" width="60" height="26" />
        <rect x="70" y="93%" rx="6" ry="6" width="60" height="26" />

        <rect x="88%" y="93%" rx="6" ry="6" width="80" height="26" />
      </ContentLoader>
    </div>
  );
};

export default PostCardSkeleton;
