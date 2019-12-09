// extends
const RootTypeDef = `
  type Query {
    _typename: String
  } 
  type Mutation {
    _typename: String
  }
  type Subscription {
    _typename: String
  } 
  input Where {
    _typename: String
  }
`;

module.exports.RootTypeDef = RootTypeDef;
