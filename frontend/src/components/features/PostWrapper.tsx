import React from "react";

interface PropsIntf {
  className?: string;
}

const PostWrapper: React.FC<PropsIntf> = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-3 gap-1 md:gap-7 ${className}`}>
      {children}
    </div>
  );
};

export default PostWrapper;
