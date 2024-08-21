import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import UserSearch from './UserSearch';
import { SEARCH_USERS } from '../utils/queries';
import '@testing-library/jest-dom/extend-expect';

const mocks = [
  {
    request: {
      query: SEARCH_USERS,
      variables: { name: 'john', first: 10 },
    },
    result: {
      data: {
        search: {
          pageInfo: { endCursor: 'endCursor123', hasNextPage: true },
          edges: [
            {
              node: {
                databaseId: '1',
                login: 'john_doe',
                name: 'John Doe',
                url: 'https://github.com/john_doe',
                avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
              },
            },
          ],
        },
      },
    },
  },
];

describe('UserSearch Component', () => {
  it('renders input and updates on typing', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserSearch />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Search for users');
    fireEvent.change(input, { target: { value: 'john' } });

    expect(input).toHaveValue('john');
  });

  it('clears input when clear button is clicked', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserSearch />
      </MockedProvider>
    );

    const input = screen.getByPlaceholderText('Search for users');
    fireEvent.change(input, { target: { value: 'john' } });

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(input).toHaveValue('');
  });

  it('displays loading spinner when loading', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserSearch />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search for users'), {
      target: { value: 'john' },
    });

    await screen.findByRole('status');
  });

  // this is the test that is failing
  it('renders user list after query success', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserSearch />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search for users'), {
      target: { value: 'john' },
    });

    await screen.findByText('john_doe (John Doe)');
  });

  it('displays error message on query failure', async () => {
    const errorMocks = [
      {
        request: {
          query: SEARCH_USERS,
          variables: { name: 'john', first: 10 },
        },
        error: new Error('Something went wrong'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <UserSearch />
      </MockedProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search for users'), {
      target: { value: 'john' },
    });

    await screen.findByText(/Something went wrong/i);
  });
});
