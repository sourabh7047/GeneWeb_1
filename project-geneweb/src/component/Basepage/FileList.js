import React from 'react';
import FileItem from './FileItem';
function FileList({ files }) {
  return (
    <ul>
      {files.map(fileName => (
        <FileItem files={files} />
      ))}
    </ul>
  );
}

export default FileList;
