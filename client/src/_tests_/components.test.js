import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

//import components to be tested
import App from '../components/App';
import TaskList from '../components/TaskList';
import ListItem from '../components/ListItem';

//enzyme imports
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
/** Test structure**/
//Setup initial State
//Dispatch Action
//Expect Data to Change

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
    }),
    cache: new InMemoryCache()
})

//Test Data
const items = [
    {
        "id": "1",
        "name": "temp",
        "isDone": false
    }
];

describe('Render Components', () => {

    //App
    it('Render App', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        expect(rendered).toBeTruthy();
    });


    //Task List
    it('Render TaskList', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <TaskList items={items}/>
            </ApolloProvider>
        );
        expect(rendered).toBeTruthy();
    });

      //ListItem
      it('Render ListItem', () => {
        const rendered = renderer.create(
            <ApolloProvider client={client}>
                <ListItem task={items}/>
            </ApolloProvider>
        );
        expect(rendered).toBeTruthy();
    });
});