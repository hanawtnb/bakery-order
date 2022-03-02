import { gql } from "@apollo/client";

export const MenuQUERY = gql`
  query getTodaysMenu {
    todaysMenus {
      data {
        attributes {
          items {
            data {
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const ItemQUERY = gql`
  query getItems {
    items {
      data {
        id
        attributes {
          name
          description
          price
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
