import { gql } from "@apollo/client";

const getAllTasks = gql`
  #graphql

  query getAllTasks {
    tasks {
      _id
      name
      startAt
      endAt
      totalTime
    }
  }
`;

const createTask = gql`
  mutation createTask($name: String, $startAt: String, $endAt: String, $totalTime: String) {
    createTasks(name: $name, startAt: $startAt, endAt: $endAt, totalTime: $totalTime) {
      _id
      name
      startAt
      endAt
      totalTime
      updatedAt
      updatedAt
    }
  }
`;

const deleTasks = gql`
  mutation deleTasks($_id: String!) {
    deleteTask(_id: $_id) {
      _id
      name
      startAt
      endAt
      totalTime
    }
  }
`;

export { getAllTasks,createTask,deleTasks };
