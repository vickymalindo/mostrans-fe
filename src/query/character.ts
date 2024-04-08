import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query ($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        species
        gender
        image
        created
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      species
      status
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      created
    }
  }
`;
