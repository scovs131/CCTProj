/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile {
    onCreateFile {
      id
      name
      type
      filePath
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile {
    onUpdateFile {
      id
      name
      type
      filePath
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile {
    onDeleteFile {
      id
      name
      type
      filePath
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset {
    onCreateVodAsset {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset {
    onUpdateVodAsset {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset {
    onDeleteVodAsset {
      id
      title
      description
      video {
        id
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
