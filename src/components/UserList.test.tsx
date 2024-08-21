import { render, screen } from '@testing-library/react';
import UserList from './UserList';

const mockEdges = [
  {
    node: {
      databaseId: '1',
      login: 'john_doe',
      name: 'John Doe',
      url: 'https://github.com/john_doe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
  },
  {
    node: {
      databaseId: '2',
      login: 'jane_doe',
      name: 'Jane Doe',
      url: 'https://github.com/jane_doe',
      avatarUrl: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
  },
];

describe('UserList Component', () => {
  it('renders the correct number of users', () => {
    render(<UserList edges={mockEdges} />);

    const users = screen.getAllByRole('link');
    expect(users).toHaveLength(2);
  });

  it('renders correct user data', () => {
    render(<UserList edges={mockEdges} />);

    const user1 = screen.getByText('john_doe (John Doe)');
    const user2 = screen.getByText('jane_doe (Jane Doe)');

    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });
});
