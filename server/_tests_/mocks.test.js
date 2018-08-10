/* Mocking with apollo_testing with jest */
const { graphql } = require('graphql');
const tester = require('graphql-tester').tester;
const { addMockFunctionsToSchema } = require('graphql-tools');

const schema = require('../graphql/index').todoSchema;

addMockFunctionsToSchema({schema , preserveResolvers: true});

describe('Types and resolvers: ', () => {
    const self = this;
    beforeAll(() => {
        self.tester = tester({});
    });

    const query = `
    query {
        tasks{
            id
            name
            isDone
        }
    }`;

    const add = `
    mutation {
        addTask(name: "add" isDone: false){
          id
          name 
          isDone
        }
      }      
  `;
//IDK WHAT TO PUT FOR ID
  const remove = `
  mutation {
    removeTask(id: ""){
      id
      name
      isDone
    }
  }        
  `;

  const update = `
  mutation{
    updateTask(id: ""
      name:"update"){
      id
      name
    }
  }
      
  `;

  const check = `
  mutation{
    completeTask(id: "" isDone: true){
      id
      name
      isDone
    }
  }  
  `;

    test('query db', async () => {
        return await expect(
            graphql(schema, query).then((result) => {
                console.log(result);
            })
        );
    });

    //wtf
    test('add to db', async () => {
        return await expect(
            graphql(schema, add).then((result) => {
                console.log(result);
            })
        );
    });
/*
    test('remove from db', async () => {
        return await expect(
            graphql(schema, remove).then((result) => {
                console.log(result);
            })
        );
    });

    test('update task in db', async () => {
        return await expect(
            graphql(schema, update).then((result) => {
                console.log(result);
            })
        );
    });

    test('change isDone of task in db', async () => {
        return await expect(
            graphql(schema, check).then((result) => {
                console.log(result);
            })
        );
    });*/
});