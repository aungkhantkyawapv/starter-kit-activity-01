import { gql } from '@apollo/client';
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
    query listLives {
        listLives {
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

test('List lives successfully retrieved lives list', async () => {
    const { client } = getApolloClient(webService.url);

    const { data } = await client.query({ query });

    console.warn(data.listLives);

    expect(data.listLives.length).toBeGreaterThan(0);
    expect(data.listLives[0].firstName).toBe('Aung Khant');
    expect(data.listLives[0].lastName).toBe('Kyaw');
});
