import { gql } from '@apollo/client';
import { ObjectId } from 'mongodb';
import { getDatabaseContext } from '../../server/database';
import {
    composeHandlers,
    loadFixtures,
    setupDatabase,
    cleanDatabase,
    setupWebService,
    getApolloClient,
} from '../helpers';
import fixtures from './authenticate.fixture.json';

const mutation = gql`
    mutation test($life: LifeCreateInput) {
        createLife(life: $life) {
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

beforeEach(composeHandlers(setupDatabase, loadFixtures(fixtures), webService.initialize));

afterEach(composeHandlers(cleanDatabase, webService.cleanUp));

test('Create life successfully create a life on valid inputs', async () => {
    const { client } = getApolloClient(webService.url);

    const variables = {
        life: {
            birthday: '2021-09-28T07:35:53.387+00:00',
            description: 'This is testing',
            firstName: 'Aung Khant',
            hobbies: ['Music', 'Game', 'Sleep'],
            lastName: 'Kyaw',
            title: 'Something',
        },
    };

    const response = await client.mutate({ mutation, variables });

    const { data } = response;
    const lifeId = new ObjectId(data.createLife.id);

    const { collections } = await getDatabaseContext();
    const life = await collections.lives.findOne({ _id: lifeId });

    expect(life).not.toBeNull();
    expect(life.firstName).toBe(variables.life.firstName);
    expect(life.lastName).toBe(variables.life.lastName);
});
