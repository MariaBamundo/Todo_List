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
const mockedItem = { id: 'item', name: 'item', isDone: false };

const mockedTasks = [
    { id: 'task1', name: 'task1', isDone: false },
    { id: 'task2', name: 'task2', isDone: true }
];


describe('Use Mock Data', () => {
    test('App', () => {
        const component = renderer.create(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        //console.log(tree);
        //expect(component.contains('div')).toBe(true);
    });


    test('TaskList', () => {
        const component = renderer.create(
            <ApolloProvider client={client}>
                <TaskList items={mockedTasks} />
            </ApolloProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        //console.log(tree);

        // manually trigger functions

        console.log(tree.children[1].children[0].children[0].props.onChange());
        console.log(component);
        // re-rendering
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        

        //test input use classname taskList

        //test delete

    });
    /*
        test('ListItem', () => {
            const component = renderer.create(
                <ApolloProvider client={client}>
                    <ListItem task={mockedItem} />
                </ApolloProvider>
            );
            let tree = component.toJSON();
            expect(tree).toMatchSnapshot();
            console.log(tree);
        });*/
});
