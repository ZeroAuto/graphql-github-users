import React from 'react';

interface UserNode {
  databaseId: string;
  login: string;
  name: string;
  url: string;
  avatarUrl: string;
  bio: string;
}

interface UserListProps {
  edges: Array<{ node: UserNode }>;
}

// memoizing this component is probably overkill for a small app
// but since this component is potentially re-rendered a lot I 
// think it's a good use case for a React.memo component
const UserList: React.FC<UserListProps> = React.memo(({ edges }) => (
  <ul>
    {edges.map((edge) => {
      const { node } = edge;
      return (
        <li
          key={node.databaseId}
          className="py-2 border-b border-gray-700 last:border-0"
        >
          <a
            className="cursor-pointer flex items-center"
            href={node.url}>
            <img
              alt="User"
              className="w-10 h-10 rounded-full mr-3"
              src={node.avatarUrl}
            />
            <span className="text-gray-300">{node.login} ({node.name})</span>
          </a>
        </li>
      );
    })}
  </ul>
));

export default UserList;
