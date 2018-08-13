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

const mockedTasks = [
  { id: 'task1', name: 'task1', isDone: false },
  { id: 'task2', name: 'task2', isDone: true }
];


describe('Test TaskList Methods', () => {
  it('checkTask', () => {
    const taskListComponent = shallow(<TaskList items={mockedTasks} />);

    let tree = toJSON(taskListComponent);
    expect(tree).toMatchSnapshot();
  });

})
