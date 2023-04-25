import { StudentSummary } from '@interfaces/teacher/Student.interface';
import { parsePhone } from '@utils/general.utils';
import ButtonPrimary from '@components/ButtonPrimary';

import EditIcon from '@icons/Edit.svg';
import TrashIcon from '@icons/Trash.svg';
import SavageBrunner from '@images/Brunner.jpg';
import Button from '@components/Button';

function TableStudents({
	students,
	handleDeleteStudent,
	handleUpdateStudent
}: {
	students: StudentSummary[];
	handleUpdateStudent: Function;
	handleDeleteStudent: Function;
}) {
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
						({ firstName, lastName, username, phone, id }, i) => (
							<tr
								key={i}
								className="border-b-gray-500 border-solid border-b hover:bg-gray-100 transition duration-300 ease-in-out"
							>
								<td>
									<div className="flex gap-4 py-4 pl-2 pr-8">
										<img
											src={SavageBrunner}
											alt="Usuario"
											className="rounded-full w-14"
										/>
										<div className="">
											<div className="text-xl font-semibold">
												{lastName}
											</div>
											<div className="text-base">
												{firstName}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div className="px-8 text-center">
										{username}
									</div>
								</td>
								<td>
									<div className="px-8 text-center">
										{parsePhone(phone)}
									</div>
								</td>
								<td>
									<div className="flex justify-center px-8">
										<Button className="px-5 rounded-xl">
											ir
										</Button>
									</div>
								</td>
								<td>
									<div className="flex gap-1 pl-8 pr-2">
										<Button
											className="bg-blue-primary rounded-xl p-0 relative w-10 h-10"
											onClick={() =>
												handleUpdateStudent(id)
											}
										>
											<img
												src={EditIcon}
												alt="Actualizar"
												className="w-3/5 h-3/5 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
											/>
										</Button>
										<Button
											className="bg-red-primary rounded-xl p-0 relative w-10 h-10"
											onClick={() =>
												handleDeleteStudent(id)
											}
										>
											<img
												src={TrashIcon}
												alt="Eliminar"
												className="w-3/5 h-3/5 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
											/>
										</Button>
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
