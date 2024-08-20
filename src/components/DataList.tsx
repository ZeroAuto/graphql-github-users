import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import useDebounce from '../hooks/useDebounce';
import LoadingSpinner from '../components/LoadingSpinner';

const GET_USERS = gql`
  query SearchUsers($name: String!) {
    search(query: $name, type: USER, first: 10) {
      edges {
        node {
          ... on User {
            id
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

const DataList: React.FC = () => {
  const [ searchTerm, setSearchTerm ] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { name: debouncedSearchTerm },
    skip: debouncedSearchTerm.length < 3,
  });

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-5 rounded-lg shadow-md text-white">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for users"
          className="w-full border-gray-600 bg-gray-700 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {loading &&
        <div className="flex justify-items-center">
          <LoadingSpinner />
        </div>
      }
      {error &&
        <div className="mb-4 p-4 bg-red-300 text-red-900 rounded border-red-900">
          <span>{error.message}</span>
        </div>
      }
      {data?.search?.edges.length > 0 && !loading && !error &&
        <ul>
          {data.search.edges.map((edge: any) => {
            const { node } = edge;
            return (
              <li
                key={node.id}
                className="flex items-center py-2 border-b border-gray-700"
              >
                <img
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                  src={node.avatarUrl}
                />
                <span className="text-gray-300">{node.name}</span>
              </li>
            )
          })}
        </ul>
      }
      {/* <div className="flex justify-center">
        <button className="primary-button px-2">Next Page</button>
      </div> */}
    </div>
  );
};

export default DataList;
