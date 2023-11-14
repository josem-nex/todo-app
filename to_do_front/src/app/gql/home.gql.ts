import { gql } from 'apollo-angular';

export const GET_TODOS = gql`
  query {
    todos {
      id
      title
      description
      status
    }
  }
`;
export const CREATE_TODO = gql`
  mutation createTodo($data: CreateTodoDto!) {
    createTodo(todoInput: $data) {
      id
      title
      description
    }
  }
`;
export const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      __typename
    }
  }
`;
export const UPDATE_TODO = gql`
  mutation updateStatusTodo($data: updateTodoDto!) {
    updateStatusTodo(updateTodo: $data) {
      id
      title
      description
    }
  }
`;
