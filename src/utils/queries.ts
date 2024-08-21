import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers($name: String!, $after: String, $first: Int!) {
    search(query: $name, type: USER, first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on User {
            databaseId
            login
            name
            url
            avatarUrl
          }
        }
      }
    }
  }
`;
