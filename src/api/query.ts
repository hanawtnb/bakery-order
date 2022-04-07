import { gql } from "@apollo/client";

export const MenuQUERY = gql`
  query menus {
    menu {
      data {
        id
        attributes {
          published
          items {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    id
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

export const RegisterMUTATION = gql`
  mutation Register($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const LoginMUTATION = gql`
  mutation Login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

// export const CartQUERY = gql`
//   query cart {
//     carts {
//       data {
//         id
//         attributes {
//           users_permissions_user {
//             data {
//               id
//               attributes {
//                 cart {
//                   data {
//                     attributes {
//                       item {
//                         data {
//                           id
//                           attributes {
//                             name
//                             price
//                             image {
//                               data {
//                                 attributes {
//                                   url
//                                 }
//                               }
//                             }
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// カートの中身を変更
export const UpdateCartMUTATION = gql`
  mutation Mutation($updateCartId: ID!, $data: CartInput!) {
    updateCart(id: $updateCartId, data: $data) {
      data {
        id
        attributes {
          item
        }
      }
    }
  }
`;

// ユーザーに対応するカートIDを取得
export const CartIdQUERY = gql`
  query Carts($filters: CartFiltersInput) {
    carts(filters: $filters) {
      data {
        id
        attributes {
          users_permissions_user {
            data {
              id
            }
          }
          item
        }
      }
    }
  }
`;
