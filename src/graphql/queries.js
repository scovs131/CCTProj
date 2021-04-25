/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFile = /* GraphQL */ `
  query GetFile($id: ID!) {
    getFile(id: $id) {
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
export const listFiles = /* GraphQL */ `
  query ListFiles(
    $filter: ModelFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        filePath
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
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
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets(
    $filter: ModelvodAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
      id
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects(
    $filter: ModelvideoObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
