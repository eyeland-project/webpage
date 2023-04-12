import { Power } from '@enums/Team.enum';
import { TeamDetail } from '@interfaces/Team.interface';

export const teams: TeamDetail[] = [
	{
		id: 1,
		code: 'team1',
		name: 'Team 1',
		students: [
			{
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				username: 'jdoe',
				power: null
			},
			{
				id: 2,
				firstName: 'Jane',
				lastName: 'Doe',
				username: 'jadoe',
				power: Power.MEMORY_PRO
			}
		],
		active: true,
		taskOrder: 1,
		playing: true
	},
	{
		id: 2,
		code: 'team2',
		name: 'Team 2',
		students: [
			{
				id: 3,
				firstName: 'Bob',
				lastName: 'Smith',
				username: 'bsmith',
				power: Power.SUPER_HEARING
			},
			{
				id: 4,
				firstName: 'Alice',
				lastName: 'Jones',
				username: 'ajones',
				power: Power.SUPER_RADAR
			}
		],
		active: true,
		taskOrder: 2,
		playing: false
	},
	{
		id: 3,
		code: 'team3',
		name: 'Team 3',
		students: [
			{
				id: 1,
				firstName: 'Alice',
				lastName: 'Smith',
				username: 'asmith',
				power: Power.MEMORY_PRO
			},
			{
				id: 2,
				firstName: 'Bob',
				lastName: 'Johnson',
				username: 'bjohnson',
				power: Power.SUPER_HEARING
			},
			{
				id: 3,
				firstName: 'Charlie',
				lastName: 'Brown',
				username: 'cbrown',
				power: Power.SUPER_RADAR
			}
		],
		active: true,
		taskOrder: 1,
		playing: true
	},
	{
		id: 5,
		code: 'team5',
		name: 'Team 5',
		students: [
			{
				id: 4,
				firstName: 'David',
				lastName: 'Lee',
				username: 'dlee',
				power: Power.SUPER_RADAR
			},
			{
				id: 5,
				firstName: 'Emily',
				lastName: 'Wong',
				username: 'ewong',
				power: null
			}
		],
		active: true,
		taskOrder: null,
		playing: false
	},
	{
		id: 6,
		code: 'team6',
		name: 'Team 6',
		students: [
			{
				id: 6,
				firstName: 'Frank',
				lastName: 'Kim',
				username: 'fkim',
				power: null
			},
			{
				id: 7,
				firstName: 'Gina',
				lastName: 'Davis',
				username: 'gdavis',
				power: Power.MEMORY_PRO
			},
			{
				id: 8,
				firstName: 'Henry',
				lastName: 'Nguyen',
				username: 'hnguyen',
				power: Power.SUPER_HEARING
			}
		],
		active: false,
		taskOrder: 2,
		playing: true
	}
];
