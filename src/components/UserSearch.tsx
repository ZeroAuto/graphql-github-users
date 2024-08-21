import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaTimes } from 'react-icons/fa';  // Import the "X" icon from react-icons

import useDebounce from '../hooks/useDebounce';
import LoadingSpinner from './LoadingSpinner';
import UserList from './UserList';

const SEARCH_USERS = gql`
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
            bio
          }
        }
      }
    }
  }
`;

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { loading, error, data, fetchMore } = useQuery(SEARCH_USERS, {
    variables: {
      name: debouncedSearchTerm,
      first: Math.floor((window.innerHeight - 160) / 56),
    },
    skip: debouncedSearchTerm.length < 3,
    notifyOnNetworkStatusChange: true,
  });

  const handleNext = () => {
    if (data?.search.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          after: data.search.pageInfo.endCursor,
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          return {
            ...prevResult,
            search: {
              ...prevResult.search,
              edges: [
                ...prevResult.search.edges,
                ...fetchMoreResult.search.edges,
              ],
              pageInfo: fetchMoreResult.search.pageInfo,
            },
          };
        },
      });
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-5 rounded-lg shadow-md text-white">
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users"
          className="w-full border-gray-600 bg-gray-700 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 pr-10"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            <FaTimes className="text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>
      {error &&
        <div className="mb-4 p-4 bg-red-300 text-red-900 rounded border-red-900">
          <span>{error.message}</span>
        </div>
      }
      {data?.search?.edges.length > 0 && !error &&
        <UserList edges={data.search.edges} />
      }
      {loading &&
        <div className="flex justify-items-center">
          <LoadingSpinner />
        </div>
      }
      <div className="flex justify-center">
        {debouncedSearchTerm.length === 0 && !error &&
          <span>Enter a search term above to find users</span>
        }
        {data?.search?.edges.length > 0 && !loading && data?.search.pageInfo.hasNextPage &&
          <button
            className="primary-button px-2"
            onClick={handleNext}
          >Next Page</button>
        }
        {data?.search?.edges.length === 0 &&
          <span>No users found</span>
        }
      </div>
    </div>
  );
};

export default UserSearch;
