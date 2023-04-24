import { StudentSummary } from '@interfaces/teacher/Student.interface';
import { parsePhone } from '@utils/general.utils';
import ButtonPrimary from '@components/ButtonPrimary';

import EditIcon from '@icons/Edit.svg';
import TrashIcon from '@icons/Trash.svg';
import SavageBrunner from '@images/Brunner.jpg';

export function TableStudents({ students }: { students: StudentSummary[] }) {
	return (
		<div>
			<table>
				<thead className="font-bold">
					<tr>
						<td></td>
						<td className="text-center bg-gray-tertiary rounded-l-lg">
							<div className="py-2">Usuario</div>
						</td>
						<td className="text-center bg-gray-tertiary">
							<div className="py-2">Teléfono</div>
						</td>
						<td className="text-center bg-gray-tertiary">
							<div className="py-2">Desempeño</div>
						</td>
						<td className="text-center bg-gray-tertiary rounded-r-lg">
							<div className="py-2">Acción</div>
						</td>
					</tr>
				</thead>
				<tbody>
					{students.map(
						({ firstName, lastName, username, phone }, i) => (
							<tr
								key={i}
								className="border-b-gray-500 border-solid border-b"
							>
								<td>
									<div className="flex gap-4 py-4 pl-2 pr-8">
										<img
											src={SavageBrunner}
											alt="Usuario"
											className="rounded-full w-14"
										/>
										<div className="">
											<div className="text-lg font-bold">
												{lastName}
											</div>
											<div className="text-xs">
												{firstName}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div className="px-8">{username}</div>
								</td>
								<td>
									<div className="px-8">
										{parsePhone(phone)}
									</div>
								</td>
								<td>
									<div className="flex justify-center px-8">
										<ButtonPrimary
											size="medium"
											rounded="xl"
										>
											ir
										</ButtonPrimary>
									</div>
								</td>
								<td>
									<div className="flex gap-1 pl-8 pr-2">
										<ButtonPrimary
											size="small"
											paddingX={false}
											bgColor="blue-primary"
											rounded="xl"
										>
											<div className="relative h-6 px-5">
												<img
													src={EditIcon}
													alt="Actualizar"
													className="w-5/6 h-5/6 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
												/>
											</div>
										</ButtonPrimary>
										<ButtonPrimary
											size="small"
											paddingX={false}
											bgColor="red-primary"
											rounded="xl"
										>
											<div className="relative h-6 px-5">
												<img
													src={TrashIcon}
													alt="Eliminar"
													className="w-5/6 h-5/6 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
												/>
											</div>
										</ButtonPrimary>
									</div>
								</td>
							</tr>
						)
					)}
				</tbody>
			</table>
		</div>
	);
}

export default TableStudents;
