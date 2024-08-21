interface UserNode {
  databaseId: string;
  login: string;
  name: string;
  url: string;
  avatarUrl: string;
}

interface UserListProps {
  edges: Array<{ node: UserNode }>;
}

export type {
  UserListProps,
}
