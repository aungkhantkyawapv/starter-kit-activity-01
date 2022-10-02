import { gql } from '@apollo/client';
import { ObjectId } from 'mongodb';
import {
    composeHandlers,
    loadFixtures,
    setupDatabase,
    cleanDatabase,
    setupWebService,
    getApolloClient,
} from '../helpers';
import lifeFixture from './life.fixture.json';

const query = gql`
    query getLife($id: ObjectID!) {
        getLife(id: $id) {
            birthday
            description
            firstName
            fullName
            hobbies
            id
            lastName
            title
        }
    }
`;

const webService = setupWebService();

beforeEach(composeHandlers(setupDatabase, loadFixtures(lifeFixture), webService.initialize));

afterEach(composeHandlers(cleanDatabase, webService.cleanUp));

test('Get life successfully retrieved specific life by ID', async () => {
    const { client } = getApolloClient(webService.url);

    const { data } = await client.query({ query, variables: { id: new ObjectId('6335582c51edb7fca921db1a') } });

    expect(data.getLife.firstName).toBe('Aung Khant');
    expect(data.getLife.lastName).toBe('Kyaw');
    expect(data.getLife.id).toBe('6335582c51edb7fca921db1a');
});
